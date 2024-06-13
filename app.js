// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

// CHECK COURSE VALIDATION

const validCourseGroup = (AssignmentGroup, CourseInfo) => {
  if (AssignmentGroup.course_id === CourseInfo.id) {
    return true;
  } else {
    throw new Error("This Assignment is not in the Course");
  }
};

//FIND ASSIGMENT INFO

const findAssigmentInfo = (assignment_id) => {
  const assigments = AssignmentGroup.assignments;
  let foundAssigment = {};

  for (let obj of assigments) {
    let id = obj.id;
    if (id === assignment_id) {
      foundAssigment = obj;
      break;
    }
  }
  return foundAssigment;
};

//TASK DUE OR NOT

const isTaskDue = (assigmentDueDate) => {
  let todaysDate = new Date().getTime();
  let date1 = new Date(assigmentDueDate).getTime();
  return todaysDate >= date1;
};

//CALCULATE SCORE

const calculateScore = (dueAt, submittedAt, score, pointsPossible) => {
  let date1 = new Date(dueAt).getTime();
  let date2 = new Date(submittedAt).getTime();
  let scoreTotal = score;

  if (isNaN(scoreTotal)) {
    throw new Error("You must just receive numbers");
  }

  if (date1 < date2) {
    //LATE
    let deduction = pointsPossible * 0.1;
    scoreTotal = score - deduction;
  }
  return scoreTotal;
};

//CALCULATE AVERAGE

const calculateAvg = (studentsMap) => {
  const studentsArr = Array.from(studentsMap.values());

  for (let i = 0; i < studentsArr.length; i++) {
    try {
      let obj = studentsArr[i];
      let avg = obj.scoreTotal / obj.poinstPossibleTotal;
      obj.avg = avg;
      delete obj.poinstPossibleTotal;
      delete obj.scoreTotal;
    } catch (error) {
      throw new Error("Points possible can not be equal to 0");
    }
  }

  return studentsArr;
};

// FIND ID
const groupStudentsById = (taskList) => {
  const students = new Map();

  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];
    const studentId = task.learner_id;
    const assigmentInfo = findAssigmentInfo(task.assignment_id);
    const isTaskDueOrNot = isTaskDue(assigmentInfo.due_at);

    if (isTaskDueOrNot) {
      const score = calculateScore(
        assigmentInfo.due_at,
        task.submission.submitted_at,
        task.submission.score,
        assigmentInfo.points_possible
      );

      try {
        let grade = score / assigmentInfo.points_possible;

        if (!students.has(studentId)) {
          let studentTasks = {
            id: studentId,
            avg: 0,
            scoreTotal: score,
            poinstPossibleTotal: assigmentInfo.points_possible,
          };
          studentTasks[task.assignment_id] = grade;
          students.set(studentId, studentTasks);
        } else {
          let studentTasks = students.get(studentId);

          studentTasks[task.assignment_id] = grade;
          // Collecting scores and points Possibles
          studentTasks.scoreTotal = studentTasks.scoreTotal + score;

          studentTasks.poinstPossibleTotal =
            studentTasks.poinstPossibleTotal + assigmentInfo.points_possible;

          students.set(studentId, studentTasks);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  const result = calculateAvg(students);

  return result;
};

// GET ASSIGNMENTS AVERAGE

function getLearnerData(course, ag, submissions) {
  const isValid = validCourseGroup(ag, course);
  let result = [];
  if (isValid) {
    result = groupStudentsById(submissions);
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
