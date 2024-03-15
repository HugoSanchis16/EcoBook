<?php

class WikiResource
{
    public function getWiki(Wiki $wiki, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $wiki->{$key};
        }

        return $newItem;
    }

    public function getWikiArray(array $wikis, array $params)
    {
        $items = [];

        foreach ($wikis as $wiki) {
            $items[] = self::getWiki($wiki, $params);
        }

        return $items;
    }

    public static function getWikiResource(Wiki $wiki)
    {
        $res = new WikiResource();
        return $res->getWiki($wiki, ['guid', 'title', 'content']);
    }

    public static function getWikiArrayResource(Wiki ...$wikis)
    {
        $res = new WikiResource();

        $items = [];
        foreach ($wikis as $wiki) {
            $items[] = $res->getWiki($wiki, ['guid', 'title']);
        }
        return $items;
    }
}
