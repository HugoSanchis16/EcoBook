<?php

class BoardResource
{
    private function getBoard(Board $board, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $board->{$key};
        }

        return $newItem;
    }

    private function getBoardsArray(array $boards, array $params)
    {
        $items = [];

        foreach ($boards as $board) {
            $items[] = $this->getBoard($board, $params);
        }

        return $items;
    }

    public static function getBoardResource(Board $board)
    {
        $res = new BoardResource();
        return $res->getBoard($board, ['guid', 'name']);
    }

    public static function getBoardsArrayResource(Board ...$boards)
    {
        $res = new BoardResource();

        $itemsArray = [];
        foreach ($boards as $board) {
            $newItem = $res->getBoard($board, ['guid', 'name', 'description']);
            $newItem->users = UserResource::getUsersArrayResource(...$board->users());
            $newItem->users_count = $board->users_count();

            $itemsArray[] = $newItem;
        }
        return $itemsArray;
    }
}
