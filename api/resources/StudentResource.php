<?php

class StudentResource
{
    public static function getStudent(Student $student, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $student->{$key};
        }

        return $newItem;
    }

    public static function getStudentsArray(array $students): array
    {
        $itemsArray = [];
        foreach ($students as $student) {
            $studentProfile = $student->profile();
            $newItem = self::getStudent($student, ['nia']);
            $newItem->{"fullname"} = $studentProfile->name . " " . $studentProfile->surnames;
            $newItem->{"email"} = $studentProfile->email;

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
