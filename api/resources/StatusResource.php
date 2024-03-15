<?php

class StatusResource
{
    private function getStatus(Status $status, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $status->{$key};
        }

        return $newItem;
    }

    private function getStatusesArray(array $statuses, array $params)
    {
        $items = [];

        foreach ($statuses as $status) {
            $items[] = $this->getStatus($status, $params);
        }

        return $items;
    }

    public static function getStatusResource(Status $status)
    {
        $res =  new StatusResource();
        return $res->getStatus($status, ['guid', 'name', 'color']);
    }

    public static function getStatusArrayResource(Status ...$statuses)
    {
        $res = new StatusResource();

        $items = [];
        foreach ($statuses as $status) {
            $items[] = self::getStatusResource($status, ['guid', 'name', 'color']);
        }
        return $items;
    }
}
