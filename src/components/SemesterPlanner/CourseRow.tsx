import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Course } from '../../data/courses';
import { useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useRole, useInteractions, FloatingFocusManager } from '@floating-ui/react';

interface CourseRowProps {
  selectedCourse: Course | null;
  onSelect: (course: Course) => void;
  onRemove: () => void;
  dragHandle: React.ReactNode;
  availableCourses: Course[];
}

const CourseRow: React.FC<CourseRowProps> = ({ 
  selectedCourse, 
  onSelect, 
  onRemove,
  dragHandle,
  availableCourses
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-start',
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const filteredCourses = availableCourses.filter(course => 
    (course.code.toLowerCase().includes(search.toLowerCase()) ||
     course.name.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (course: Course) => {
    onSelect(course);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="course-row">
      {dragHandle}
      
      <div className="course-input-container" ref={refs.setReference} {...getReferenceProps()}>
        <input
          ref={inputRef}
          type="text"
          className="course-search"
          value={search || (selectedCourse ? `${selectedCourse.code} - ${selectedCourse.name}` : '')}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a course..."
          onClick={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="course-dropdown"
            {...getFloatingProps()}
          >
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <div
                  key={course.id}
                  className="course-option"
                  onClick={() => handleSelect(course)}
                >
                  <div className="course-option-code">{course.code}</div>
                  <div className="course-option-name">{course.name}</div>
                  <div className="course-option-credits">{course.credits} cr</div>
                </div>
              ))
            ) : (
              <div className="no-results">No courses found</div>
            )}
          </div>
        </FloatingFocusManager>
      )}
      
      <button 
        className="remove-course-btn"
        onClick={onRemove}
        aria-label="Remove Course"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default CourseRow;