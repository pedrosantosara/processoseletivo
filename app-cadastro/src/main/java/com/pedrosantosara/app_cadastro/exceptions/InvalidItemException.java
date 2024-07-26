package com.pedrosantosara.app_cadastro.exceptions;

public class InvalidItemException extends RuntimeException {
    
    public InvalidItemException() {super("Invalid Item format");}

    public InvalidItemException(String message) {super(message);}
}
