package com.pedrosantosara.app_cadastro.exceptions;

public class ItemNotFoundException extends RuntimeException {
    public ItemNotFoundException() {super("Not Found Item");}

    public ItemNotFoundException(String message) {super(message);}
}
