<?php

class BookResource
{
    private static function getBook(Book $book, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $book->{$key};
        }

        return $newItem;
    }

    public static function getBooksArray(array $books): array
    {
        $itemsArray = [];
        foreach ($books as $book) {

            $newItem = self::getBook($book, ['name', 'isbn', 'stock', 'guid']);

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
