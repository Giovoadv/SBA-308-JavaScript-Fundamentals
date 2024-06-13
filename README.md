
This is a simple script designed to manage and analyze learner submissions for assignments within a specific course.


OVERVIEW


The script takes three main data inputs:

1.Course Information: Details about the course, including its ID and name.
2.Assignment Group: Information about a group of assignments within the course, including assignment IDs, names, due dates, and points possible.
3.Learner Submissions: Data about learners' submissions for various assignments, including learner IDs, assignment IDs, submission details (submitted date and score).



FUNCTIONALITY


The script provides several functions:

1.Course Validation: Checks if a given assignment group belongs to the provided course.
2.Assignment Information Retrieval: Finds information about a specific assignment based on its ID.
3.Task Due Check: Determines if a task is due based on its due date.
4.Score Calculation: Calculates the final score for a submission, considering the due date and any possible deductions for late submissions.
5.Average Calculation: Calculates the average score for each student across all assignments they've submitted.
6.Grouping Students by ID: Groups student submissions by their IDs, calculates their scores, and computes their average scores across all assignments.


USAGE


To use the script:

1.Define the Course Information, Assignment Group, and Learner Submissions.
2.Call the getLearnerData() function with the provided data as arguments.
3.The function will return an array of objects containing each student's ID and their average score across assignments they've submitted.
4.The result is logged to the console.
