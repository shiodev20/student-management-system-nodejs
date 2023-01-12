
select * from `TeachingAssignments`;

SELECT
    `Classroom`.`id`,
    `Classroom`.`name`,
    `Classroom`.`size`,
    `Classroom`.`gradeId`,
    `Classroom`.`yearId`,
    `Classroom`.`headTeacherId`,
    `classroomSubjects`.`id` AS `classroomSubjects.id`,
    `classroomSubjects->teachingAssignments`.`id` AS `classroomSubjects.teachingAssignments.id`,
    `classroomSubjects->teachingAssignments`.`classroomSubjectId` AS `classroomSubjects.teachingAssignments.classroomSubjectId`,
    `classroomSubjects->teachingAssignments`.`subjectTeacherId` AS `classroomSubjects.teachingAssignments.subjectTeacherId`
FROM
    `Classrooms` AS `Classroom`
    LEFT OUTER JOIN `ClassroomSubjects` AS `classroomSubjects` ON `Classroom`.`id` = `classroomSubjects`.`classroomId`
    INNER JOIN `TeachingAssignments` AS `classroomSubjects->teachingAssignments` ON `classroomSubjects`.`id` = `classroomSubjects->teachingAssignments`.`classroomSubjectId`;