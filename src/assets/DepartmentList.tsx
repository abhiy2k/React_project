import React, { useState } from "react";
import {
  Checkbox,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ChevronRight } from "@mui/icons-material";

interface Department {
  department: string;
  sub_departments: string[];
}

interface DepartmentListProps {
  data: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ data }) => {
  const [open, setOpen] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Handle click on department to expand or collapse its sub-departments
  const handleItemClick = (department: string) => {
    setOpen((prevOpen) => (prevOpen === department ? null : department));
  };

  // Handle click on checkbox to select or deselect all sub-departments of a department
  const handleSelectAllSubDepartments = (department: string) => {
    if (isDepartmentSelected(department)) {
      // If all sub-departments are selected, remove department and all sub-departments from selection
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (item) =>
            item !== department &&
            !(data.find((d) => d.department === department)?.sub_departments ?? []).includes(item)
        )
      );
    } else {
      // If not all sub-departments are selected, add department and all sub-departments to selection
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        department,
        ...(data.find((d) => d.department === department)?.sub_departments ?? []),
      ]);
    }
  };

  // Handle click on checkbox to individually select or deselect a sub-department
  const handleSelectSubDepartment = (subDepartment: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(subDepartment)
        ? prevSelectedItems.filter((item) => item !== subDepartment)
        : [...prevSelectedItems, subDepartment]
    );
  };

  // Check if a department is selected by checking if it and all its sub-departments are in the selection
  const isDepartmentSelected = (department: string) => {
    const departmentData = data.find((item) => item.department === department);
    if (departmentData) {
      const allSubDepartments = departmentData.sub_departments;
      return (
        selectedItems.includes(department) &&
        allSubDepartments.every((subDepartment) => selectedItems.includes(subDepartment))
      );
    }
    return selectedItems.includes(department);
  };

  return (
    <List>
      {data.map(({ department, sub_departments }) => (
        <React.Fragment key={department}>
          <ListItem button onClick={() => handleItemClick(department)}>
            <ListItemIcon>
              {open === department ? <ExpandLess /> : <ChevronRight />}
              <Checkbox
                edge="start"
                checked={isDepartmentSelected(department)}
                onClick={() => handleSelectAllSubDepartments(department)}
              />
            </ListItemIcon>
            <ListItemText primary={<strong>{department}</strong>} />
          </ListItem>
          <Collapse in={open === department} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sub_departments.map((subDepartment) => (
                <ListItem
                  key={subDepartment}
                  button
                  style={{ paddingLeft: "40px" }} // Offset the sub-departments to the right
                  onClick={() => handleSelectSubDepartment(subDepartment)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedItems.includes(subDepartment)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment} />
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
