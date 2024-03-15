<?php

class CardResource
{
    private function getCard(Card $card, array $params)
    {
        $newItem = new stdClass();

        foreach ($params as $key) {
            $newItem->{$key} = $card->{$key};
        }

        return $newItem;
    }

    private function getCardsArray(array $cards, array $params)
    {
        $items = [];

        foreach ($cards as $card) {
            $items[] = $this->getCard($card, $params);
        }

        return $items;
    }

    public static function getCardResource(Card $card)
    {
        $res = new CardResource();

        $item = $res->getCard($card, ['guid', 'title']);
        return $item;
    }

    public static function getCardOverviewResource(Card $card)
    {
        $res = new CardResource();

        $item = $res->getCard($card, ['guid', 'title', 'description', 'createdat', 'type', 'duedate', 'done']);
        $item->createdBy = UserResource::getUserResource($card->user());
        $item->status = $card->status()->name;
        $item->priority  = $card->priority()->name;
        $item->difficulty = $card->difficulty()->name;
        return $item;
    }

    public static function getCardsArrayResource(Card ...$cards)
    {
        $res = new CardResource();

        $items = [];

        foreach ($cards as $card) {
            $newItem = $res->getCard($card, ['guid', 'title', 'uniquecode', 'cover', 'type']);
            $items[] = $newItem;
        }

        return $items;
    }

    public static function getCalendarArrayResource(Card ...$cards)
    {
        $res = new CardResource();

        $items = [];
        foreach ($cards as $card) {
            $newItem = $res->getCard($card, ['guid', 'title']);
            $newItem->{'start'} = $card->duedate;
            $newItem->{'end'} = $card->duedate;
            $items[] = $newItem;
        }
        return $items;
    }
}
