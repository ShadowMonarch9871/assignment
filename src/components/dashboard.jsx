import React, { useState } from 'react';

const tickets = [
  {
    id: "CAM-1",
    title: "Update User Profile Page UI",
    tag: "Feature Request",
    status: "Todo",
    priority: "Low",
    user: "Harsh Navani"
  },
  {
    id: "CAM-2",
    title: "Implement Email Notification System",
    tag: "Feature Request",
    status: "Todo",
    priority: "High",
    user: "Arbaz Sayyed"
  },
  //& Testing random data 
];

const priorityOrder = {
  "Urgent": 0,
  "High": 1,
  "Medium": 2,
  "Low": 3,
  "No priority": 4
};

const KanbanBoard = () => {
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');
  
  const getGroupedData = () => {
    let groups = {};
    let groupTitles = [];
    
    switch(groupBy) {
      case 'user':
        tickets.forEach(ticket => {
          if (!groups[ticket.user]) {
            groups[ticket.user] = [];
            groupTitles.push(ticket.user);
          }
          groups[ticket.user].push(ticket);
        });
        break;
        
      case 'priority':
        const priorities = ["Urgent", "High", "Medium", "Low", "No priority"];
        priorities.forEach(p => groups[p] = []);
        groupTitles = priorities;
        tickets.forEach(ticket => {
          groups[ticket.priority].push(ticket);
        });
        break;
        
      default: // status
        const statuses = ["Todo", "In Progress", "Done", "Canceled"];
        statuses.forEach(s => groups[s] = []);
        groupTitles = statuses;
        tickets.forEach(ticket => {
          groups[ticket.status].push(ticket);
        });
    }
    
    //* Sorigng the groups
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.title.localeCompare(b.title);
      });
    });
    
    return { groups, groupTitles };
  };

  const TaskCard = ({ task }) => (
    <div className="task-card">
      <div className="task-header">
        <span className="task-id">{task.id}</span>
        <img
          src={`/api/placeholder/24/24`}
          alt={task.user}
          className="avatar"
        />
      </div>
      <h3 className="task-title">{task.title}</h3>
      <div className="task-footer">
        <span className={`priority-tag ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
        <span className="task-tag">{task.tag}</span>
      </div>
    </div>
  );

  const { groups, groupTitles } = getGroupedData();

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <div className="header-controls">
          <div className="control-group">
            <label>Display</label>
            <select 
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="control-group">
            <label>Ordering</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="kanban-board">
        {groupTitles.map((groupTitle) => (
          <div key={groupTitle} className="kanban-column">
            <div className="column-header">
              <div className="column-title">
                <h2>{groupTitle}</h2>
                <span className="task-count">
                  {groups[groupTitle].length}
                </span>
              </div>
              <div className="column-actions">
                <button className="icon-button">+</button>
                <button className="icon-button">⋯</button>
              </div>
            </div>
            <div className="column-content">
              {groups[groupTitle].map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

const styles = `
  .kanban-container {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 24px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }

  .kanban-header {
    margin-bottom: 24px;
  }

  .header-controls {
    display: flex;
    gap: 16px;
  }

  .control-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .control-group label {
    font-size: 14px;
    color: #666;
  }

  .control-group select {
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    background-color: white;
  }

  .kanban-board {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    align-items: start;
  }

  .kanban-column {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
  }

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .column-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .column-title h2 {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
  }

  .task-count {
    background-color: #e9ecef;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    color: #666;
  }

  .column-actions {
    display: flex;
    gap: 4px;
  }

  .icon-button {
    background: none;
    border: none;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
    color: #666;
  }

  .icon-button:hover {
    background-color: #e9ecef;
  }

  .column-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .task-card {
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .task-id {
    font-size: 12px;
    color: #666;
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .task-title {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 12px 0;
    color: #333;
  }

  .task-footer {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .priority-tag {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: #f8f9fa;
  }

  .priority-tag.urgent {
    background-color: #ffeaea;
    color: #dc3545;
  }

  .priority-tag.high {
    background-color: #fff3cd;
    color: #856404;
  }

  .priority-tag.medium {
    background-color: #e8f4f8;
    color: #0c5460;
  }

  .priority-tag.low {
    background-color: #f8f9fa;
    color: #6c757d;
  }

  .task-tag {
    font-size: 12px;
    color: #666;
  }

  .task-tag::before {
    content: "•";
    margin-right: 4px;
  }

  @media (max-width: 768px) {
    .kanban-board {
      grid-template-columns: 1fr;
    }

    .kanban-container {
      padding: 16px;
    }

    .header-controls {
      flex-direction: column;
    }
  }
`;

//! styled badme updation needed
const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);