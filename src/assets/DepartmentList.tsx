import React, { useState } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Define the interface for the Department object
interface Department {
  id: number;
  name: string;
  children: Department[];
}

const DepartmentList: React.FC = () => {
  // State variables to keep track of expanded department and selected items
  const [expandedParent, setExpandedParent] = useState<{ [key: number]: boolean }>({});
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // hardcored Json Data
  const data: Department[] = [
    {
      id: 1,
      name: 'customer_service',
      children: [
        { id: 11, name: 'support', children: [] },
        { id: 12, name: 'customer_success', children: [] },
        // Add more sub departments as needed
      ],
    },
    {
      id: 2,
      name: 'design',
      children: [
        { id: 21, name: 'graphic_design', children: [] },
        { id: 22, name: 'product_design', children: [] },
        { id: 23, name: 'web_design', children: [] },
        // Add more sub departments as required
      ],
    },
    // Add more departments as required
  ];

  // Adding a little UI and styling to the Deparment and sub department
  const styles = {
    parentItem: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 2,
      backgroundColor: '#f5f5f5', 
    },
    childItem: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 10,
      backgroundColor: 'white', 
      borderLeft: '2px solid #e0e0e0', 
    },
    childOffset: {
      marginLeft: 2,
    },
  };

  // Function to handle expanding/collapsing of a department
  const handleParentExpand = (parentId: number) => {
    setExpandedParent((prevState) => ({
      ...prevState,
      [parentId]: !prevState[parentId],
    }));
  };

  // Function to handle selecting/unselecting of a department
  const handleParentSelect = (parentId: number) => {
    const parent = data.find((item) => item.id === parentId);
    if (!parent) return;

    const allChildrenSelected = parent.children.every((child) =>
      selectedItems.includes(child.id)
    );

    let newSelectedItems: number[];
    if (allChildrenSelected) {
      newSelectedItems = selectedItems.filter(
        (item) => item !== parentId && !parent.children.some((child) => child.id === item)
      );
    } else {
      newSelectedItems = [...selectedItems, parentId, ...parent.children.map((child) => child.id)];
    }

    setSelectedItems(newSelectedItems);
  };

  // Function to handle selecting/unselecting of a sub department
  const handleChildSelect = (childId: number, parentId: number) => {
    const parent = data.find((item) => item.id === parentId);
    if (!parent) return;

    const childIndex = selectedItems.indexOf(childId);

    let newSelectedItems: number[];
    if (childIndex !== -1) {
      newSelectedItems = selectedItems.filter((item) => item !== childId);
    } else {
      newSelectedItems = [...selectedItems, childId];
    }

    setSelectedItems(newSelectedItems);

    // If all sub department are selected, also select the department
    const allChildrenSelected = parent.children.every((child) =>
      newSelectedItems.includes(child.id)
    );

    const isParentSelected = newSelectedItems.includes(parentId);
    if (allChildrenSelected && !isParentSelected) {
      setSelectedItems((prevSelected) => [...prevSelected, parentId]);
    } else if (!allChildrenSelected && isParentSelected) {
      setSelectedItems((prevSelected) => prevSelected.filter((item) => item !== parentId));
    }
  };

  return (
    <List>
      {data.map((parent) => (
        <React.Fragment key={parent.id}>
          <ListItem button sx={styles.parentItem}>
            {expandedParent[parent.id] ? (
              <IconButton onClick={() => handleParentExpand(parent.id)}>
                <ExpandLessIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleParentExpand(parent.id)}>
                <ExpandMoreIcon />
              </IconButton>
            )}
            <Checkbox
              edge="start"
              checked={selectedItems.includes(parent.id)}
              indeterminate={
                parent.children.some((child) => selectedItems.includes(child.id)) &&
                !selectedItems.includes(parent.id)
              }
              onClick={() => handleParentSelect(parent.id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={`${parent.name} (${parent.children.length})`}
              sx={{ marginLeft: 1 }} // Adjust the marginLeft as needed
            />
          </ListItem>
          <Collapse in={expandedParent[parent.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {parent.children.map((child) => (
                <ListItem key={child.id} button sx={styles.childItem}>
                  <Checkbox
                    edge="start"
                    checked={selectedItems.includes(child.id)}
                    onClick={() => handleChildSelect(child.id, parent.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={child.name} sx={styles.childOffset} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
