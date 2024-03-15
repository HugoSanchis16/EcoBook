<?php

class FileStorage
{
    public static function generateThumbnail($finalPath, $img, $maxWidth = MAX_THUMB_WIDTH, $maxHeight = MAX_THUMB_HEIGHT)
    {
        $arr_image_details = getimagesize($img);
        $width = $arr_image_details[0];
        $height = $arr_image_details[1];

        $percent = 100;
        if ($width > $maxWidth) $percent = floor(($maxWidth * 100) / $width);

        if (floor(($height * $percent) / 100) > $maxHeight)
            $percent = (($maxHeight * 100) / $height);

        if ($width > $height) {
            $newWidth = $maxWidth;
            $newHeight = round(($height * $percent) / 100);
        } else if ($width < $height) {
            $newWidth = round(($width * $percent) / 100);
            $newHeight = $maxHeight;
        } else {
            $newWidth = $maxWidth;
            $newHeight = $maxHeight;
        }

        if ($arr_image_details[2] == 1) {
            $imgt = "ImageGIF";
            $imgcreatefrom = "ImageCreateFromGIF";
        }
        if ($arr_image_details[2] == 2) {
            $imgt = "ImageJPEG";
            $imgcreatefrom = "ImageCreateFromJPEG";
        }
        if ($arr_image_details[2] == 3) {
            $imgt = "ImagePNG";
            $imgcreatefrom = "ImageCreateFromPNG";
        }
        if ($arr_image_details[2] == 18) {
            $imgt = "ImageWEBP";
            $imgcreatefrom = "ImageCreateFromWEBP";
        }


        if ($imgt) {
            $old_image = $imgcreatefrom($img);
            $new_image = imagecreatetruecolor($newWidth, $newHeight);
            imagecopyresized($new_image, $old_image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

            $imgt($new_image, $finalPath . ".jpg");
            return;
        }
    }

    public static function getFileExtension(stdClass $file): string
    {
        $splitName = explode('.', $file->fileName);
        return $splitName[count($splitName) - 1];
    }

    public static function getFileName(Media $media, stdClass $file): string
    {
        $extension = self::getFileExtension($file);
        return "$media->guid.$extension";
    }

    public static function FilePath(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/files/$fileName";
    }

    public static function FileURL(string $code): string
    {
        return API_URL . "/endpoints/media/getMedia.php?code=$code";
    }

    public static function getThumbnailName(Media $media, stdClass $file): string
    {
        return "$media->guid";
    }

    public static function ThumbnailPath(string $fileName = ""): string
    {
        return FILE_STORAGE_PATH . "/thumbnails/$fileName";
    }

    public static function ThumbnailURL(string $code): string
    {
        return API_URL . "/endpoints/media/getThumbnail.php?code=$code";
    }
}
