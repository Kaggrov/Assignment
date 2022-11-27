import React from 'react'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag ,Typography,Select,Input,Popconfirm} from 'antd';
import { useRef ,useState} from 'react'
import { DownOutlined } from '@ant-design/icons';


const Table = ({todo,setTodo}) => {

    const [dropText,setDropText] = useState("Open");

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    const handleDelete = (key) => {
      const newData = dataSource.filter((item) => item.key !== key);
      setTodo(newData);
    };

    const edit = (record) => {
      setEditingKey(record.key);
    };

    const save = async (key) => {
      try {
        const newData = [...todo];
        const index = newData.findIndex((item) => key === item.key);

        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
          });
          setTodo(newData);
          setEditingKey('');
        } else {
          
          setTodo(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const items =  [
        {
          label: 'Open',
          key: 'open',
        },
        {
          label: 'Working',
          key: 'working',
        },
        {
            label: 'Done',
            key: 'done',
        },
        {
            label: 'Overdue',
            key: 'overdue',
        },
      ]
    
      const handleChange = ({ key }) => {
            setDropText(key);
      };

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
              {record.labels.map((name) => (
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
    
              <Dropdown
                  menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ['open'],
                  }}
                  
              >
                  <Typography.Link>
                    <Space>
                      Status
                      <DownOutlined />
                    </Space>
                  </Typography.Link>
              </Dropdown>
            ),
          },
        {
          title: 'Action',
          valueType: 'option',
          key: 'option',
          render: (text, record, _, action) => [
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <>
              <a
                key="editable"
                onClick={() => {
                  action?.startEditable?.(record.id);
                } }
              >
                Edit
              </a>
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
              </Popconfirm></>
            
          ],
        },
      ];
      
      const actionRef = useRef();
      
      const dataSource = [
        {
            id:1,
            title:"Hello",
            Description:"Bye",
            DueDate:"11-12-12",
            labels:[{name:"tag"}]
            
        }
      ]
    const [value, setValue] = useState('');

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
        onChange(value) {
          console.log('value: ', value);
        },
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
      form={{
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
      }}
      toolBarRender={false}
      headerTitle="List"
      search={false} /></>

  )
}

export default Table