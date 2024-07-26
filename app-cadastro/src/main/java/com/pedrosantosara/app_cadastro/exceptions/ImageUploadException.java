package com.pedrosantosara.app_cadastro.exceptions;

public class ImageUploadException extends RuntimeException {

    public ImageUploadException() {super("Upload image failed");}

    
    public ImageUploadException(String message) {super(message);}
}
