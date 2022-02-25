package pe.gob.ceabeserviceauth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.gob.ceabeserviceauth.dto.ResponseKeycloak;
import pe.gob.ceabeserviceauth.model.UserKeycloak;
import pe.gob.ceabeserviceauth.service.KeycloakService;


@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController {

    @Autowired
    private KeycloakService keycloakService;

    @PostMapping("/create")
    public ResponseEntity<ResponseKeycloak> create(@RequestBody UserKeycloak userKeycloak) {
        ResponseKeycloak responseKeycloak = keycloakService.createUser(userKeycloak);
        return ResponseEntity.status(responseKeycloak.getStatus()).body(responseKeycloak);
    }
}
