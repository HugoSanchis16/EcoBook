<?php

class CourseResource
{
    public static function getCourse(Course $course, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $course->{$key};
        }

        return $newItem;
    }

    public static function getCoursesArray(array $courses): array
    {
        $itemsArray = [];
        foreach ($courses as $course) {

            $newItem = self::getCourse($course, ['abbr', 'name', 'guid']);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
