const StudentForm = document.getElementById('StudentForm');
const StudentList = document.getElementById('StudentList');
const errorDiv = document.getElementById('error');
const Students = [];

// Corrected event listener syntax
StudentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const StudentId = document.getElementById('StudentId').value;
    const StudentName = document.getElementById('StudentName').value;
    const StudentAge = document.getElementById('StudentAge').value;
    
    try {
        addStudent(StudentId, StudentName, StudentAge);
        displayStudents();
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
    
    StudentForm.reset();
});

function addStudent(id, name, age) {
    if (!id || !name || !age) {
        throw new Error('All Fields are required');
    }
    if (isNaN(age) || age <= 0) {
        throw new Error('Age must be a positive Number');
    }
    
    const StudentExists = Students.some(Student => Student.id == id);
    if (StudentExists) {
        throw new Error('Student Id already exists.');
    }

    const Student = {
        id,
        name,
        age: parseInt(age, 10)
    };
    
    Students.push(Student);
}

// Moved displayStudents function outside addStudent
function displayStudents() {
    StudentList.innerHTML = '';
    Students.forEach(Student => {
        const li = document.createElement('li');
        // Corrected string interpolation syntax
        li.textContent = `ID: ${Student.id}, Name: ${Student.name}, Age: ${Student.age}`;
        StudentList.appendChild(li);
    });
}