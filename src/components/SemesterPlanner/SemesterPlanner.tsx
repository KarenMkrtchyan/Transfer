import React, { useState } from 'react';
import { PlusCircle, GripVertical, Save, Info } from 'lucide-react';
import CourseRow from './CourseRow';
import { Course, courses as availableCourses } from '../../data/courses';
import { generateId } from '../../utils/helpers';
import './SemesterPlanner.css';

interface SelectedCourse extends Course {
  tempId: string;
}

interface Semester {
  id: string;
  title: string;
  courses: SelectedCourse[];
}

interface SemesterPlannerProps {
  semester: Semester;
  onUpdate: (updates: Partial<Semester>) => void;
  onDragStart: (courseIndex: number) => void;
  onDragOver: (e: React.DragEvent, targetIndex: number) => void;
  onDragEnd: () => void;
  onSave: () => void;
}

const SemesterPlanner: React.FC<SemesterPlannerProps> = ({
  semester,
  onUpdate,
  onDragStart,
  onDragOver,
  onDragEnd,
  onSave
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const addCourse = () => {
    const newCourse: SelectedCourse = {
      tempId: generateId(),
      id: '',
      name: '',
      code: '',
      credits: 0,
      category: 'core'
    };
    
    onUpdate({ courses: [...semester.courses, newCourse] });
  };

  const removeCourse = (tempId: string) => {
    onUpdate({
      courses: semester.courses.filter(course => course.tempId !== tempId)
    });
  };

  const selectCourse = (tempId: string, course: Course) => {
    onUpdate({
      courses: semester.courses.map(c =>
        c.tempId === tempId ? { ...course, tempId } : c
      )
    });
  };

  const handleSave = () => {
    onSave();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const totalCredits = semester.courses.reduce((sum, course) => 
    sum + (course.credits || 0), 0);

  return (
    <div className="semester-planner">
      <div className="planner-header">
        <div className="title-container">
          <input
            type="text"
            value={semester.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="semester-title"
            placeholder="Enter Semester Title"
            aria-label="Semester Title"
          />
          <div className="info-icon" onClick={() => setShowInfo(!showInfo)}>
            <Info size={18} />
          </div>
        </div>
        
        {showInfo && (
          <div className="info-panel">
            <p>Search for courses using the course code or name. Click to select a course from the dropdown.</p>
            <p>Drag courses to reorder them or move them between semesters.</p>
          </div>
        )}
        
        <div className="credit-counter">
          <span className="credit-count">{totalCredits}</span>
          <span className="credit-label">Credits</span>
        </div>
      </div>
      
      <div className="courses-container">
        <div className="courses-header">
          <div></div>
          <div>Course</div>
          <div></div>
        </div>
        
        {semester.courses.map((course, index) => (
          <div 
            key={course.tempId}
            className="course-row-container"
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragEnd={onDragEnd}
          >
            <CourseRow
              selectedCourse={course.id ? course : null}
              onSelect={(selectedCourse) => selectCourse(course.tempId, selectedCourse)}
              onRemove={() => removeCourse(course.tempId)}
              dragHandle={<div className="drag-handle"><GripVertical size={16} /></div>}
              availableCourses={availableCourses}
            />
          </div>
        ))}
      </div>
      
      <div className="planner-actions">
        <button 
          className="add-course-btn"
          onClick={addCourse}
          aria-label="Add Course"
        >
          <PlusCircle size={16} />
          <span>Add Course</span>
        </button>
        
        <button 
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
          aria-label="Save Planner"
        >
          <Save size={16} />
          <span>{isSaved ? 'Saved!' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
};

export default SemesterPlanner;