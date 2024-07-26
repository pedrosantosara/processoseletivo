package com.pedrosantosara.app_cadastro.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.pedrosantosara.app_cadastro.exceptions.ImageUploadException;
import com.pedrosantosara.app_cadastro.exceptions.InvalidItemException;
import com.pedrosantosara.app_cadastro.exceptions.ItemNotFoundException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ItemNotFoundException.class)
    private ResponseEntity<RestErrorMessage> itemNotFoundHandler(ItemNotFoundException exception){
        RestErrorMessage response = new RestErrorMessage(HttpStatus.NOT_FOUND,exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(ImageUploadException.class)
    private ResponseEntity<RestErrorMessage> imageUploadHandler(ImageUploadException exception){
        RestErrorMessage response = new RestErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR,exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(InvalidItemException.class)
    private ResponseEntity<RestErrorMessage> invalidItemHandler(InvalidItemException exception){
        RestErrorMessage response = new RestErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR,exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
