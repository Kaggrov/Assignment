import React from 'react'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag ,Typography,Select,Input,Popconfirm} from 'antd';
import { useRef ,useState} from 'react'
import { DownOutlined } from '@ant-design/icons';
import {Form} from 'antd';


const Table = ({todo,setTodo}) => {


    const [editingRow,setEditingRow] = useState(null);
    const [editingRowTitle,setEditingRowTitle] = useState(null);
    const [form] = Form.useForm();
    
    const handleDelete = (key) => {
      const newData = todo.filter((item) => item.id !== key);
      console.log(newData)
      setTodo(newData);
    };

    const stat =  ["Open","Working","Done","Overdue"];

    
    const columns = [
        {
          dataIndex: 'index',
          valueType: 'indexBorder',
          width: 48,
        },
        {
            title: 'TimeStamp',
            dataIndex: 'timeStamp',
            ellipsis: true,
            editable: false,
            sorter:(a, b) => a.timestamp.localeCompare(b.timestamp),
            tip: 'Creation of note',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: 'Invalid',
                },
              ],
            },
          },
        {
          title: 'Title',
          dataIndex: 'title',
          ellipsis: true,
          editable: true,
          sorter: (a, b) => a.title.localeCompare(b.title),
          tip: 'Title of Todo note ',
          render: (text,record) => {
              const handleChange = (e) => {
                setEditingRowTitle(e.target.value)
              }

              if(editingRow === record.id){
                console.log("hello");
                return (<Form.Item
                  name="title"
                  rules={[{
                    required:true,
                    message:"Please Enter title",
                  }]}
                >
                  <Input onChange={handleChange}/>
                </Form.Item>);

              }else {
                return <p>{text}</p>
              }
          },
          formItemProps: {
            rules: [
              {
                required: true,
                message: 'Invalid',
              },
            ],
          },
        },
        {
            title: 'Description',
            sorter:(a, b) => a.Description.localeCompare(b.Description),
            dataIndex: 'Description',
            tip: 'Description of the Todo ',
            editable:true,
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: 'Invalid',
                },
              ],
            },
          },
        {
          title: 'Due Date',
          key: 'showTime',
          editable: true,
          dataIndex: 'DueDate',
          valueType: 'date',
          sorter: (a, b) => a.DueDate.localeCompare(b.DueDate),
          hideInSearch: true,
        },
        {
          disable: true,
          title: 'Tags for Importance',
          dataIndex: 'tags',
          filters: true,
          onFilter: true,
          filters: [
            {
              text: 'Urgent',
              value: 'Urgent',
            },
            {
              text: 'Priority',
              value: 'Priority',
            },
            {
              text:'Slow',
              value:'Slow'
            },
            {
              text:'Not Important',
              value:'Not Important'
            }
          ],
          search: false,
          renderFormItem: (_, { defaultRender }) => {
            return defaultRender(_);
          },
          render: (_, record) => (
            <Space>
              {record?.labels?.map((name) => (
                <Tag key={name}>
                  {name}
                </Tag>
              ))}
            </Space>
          ),
        },
        {
            dataIndex: 'status',
            title: 'Status',
            
            render: (_,record) => (
    
                  <Select placeholder={record.st} style={{marginLeft:"10px"}}>
                    {
                        stat.map((status,index)=>{
                            return <Select.Option key={index} value={status}>{status}</Select.Option>
                        } )
                    }
                  </Select>
            ),
          },
        {
          title: 'Action',
          valueType: 'option',
          key: 'option',
          render: (text, record, _, action) => [
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <>
              <Button type="link" style={{marginLeft:0,padding:0}} onClick={() => {
                setEditingRow(record.id);
              }}>
              Edit
              </Button>
              <Button type='link' style={{marginLeft:"0px",padding:0}}
                htmlType='submit'
              >
                Save
              </Button>
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                <a>Delete</a>
              </Popconfirm></>
            
          ],
        },
      ];
      
      const actionRef = useRef();
      
    const [value, setValue] = useState('');

    const onFinish = (values) => {
      const UpdatedDataSource = [...todo]
      
      values = {
        title : editingRowTitle,
      }

      UpdatedDataSource[editingRow - 1]['title'] = values.title;

      setTodo(UpdatedDataSource)
      setEditingRow(null)
      setEditingRowTitle(null)
    }

  return (
    <><Input
    style={{marginBottom:'10px'}}
    placeholder="Search Title ...."
    value={value} 
    onChange={e => {
      const currValue = e.target.value;
      setValue(currValue);
      const filteredData = todo.filter(entry =>
        entry.title.includes(currValue)
      );
      setTodo(filteredData);
    }}
  />
      <Form form={form} onFinish={onFinish}>
        <ProTable
      dataSource={todo}
      actionRef={actionRef}
      columns={columns}
      cardBordered
      editable={{
        type: 'multiple',
      }}

      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      // search={{
      //     labelWidth: 'auto',
      //   }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
      }}
      toolBarRender={false}
      headerTitle="List"
      search={false} />
      </Form>
      </>
    
  )
}

export default Table