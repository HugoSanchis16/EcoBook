<?php

class HistoryResource
{
    public static function getHistory(History $history, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $history->{$key};
        }

        return $newItem;
    }

    public static function getHistoryArray(array $history): array
    {
        $itemsArray = [];
        foreach ($history as $history) {
            $copy = $history->copy();
            $book = $copy->book();
            $newItem = self::getHistory($history, ["guid"]);
            $newItem->{"book_name"} = $book->name;
            $newItem->{"uniqid"} = $copy->uniqid;
            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
