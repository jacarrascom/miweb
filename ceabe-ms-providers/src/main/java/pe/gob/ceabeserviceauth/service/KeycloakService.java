package pe.gob.ceabeserviceauth.service;


import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pe.gob.ceabeserviceauth.dto.ResponseKeycloak;
import pe.gob.ceabeserviceauth.model.UserKeycloak;

import javax.ws.rs.core.Response;
import java.util.Arrays;

@Service
public class KeycloakService {

    @Value("${keycloak.auth-server-url}")
    private String server_url;

    @Value("${keycloak.realm}")
    private String realm;

    public ResponseKeycloak createUser(UserKeycloak userKeycloak) {
        ResponseKeycloak responseKeycloak = new ResponseKeycloak();
        responseKeycloak.setSuccess(false);
        try {
            UsersResource usersResource = getUsersResource();
            UserRepresentation userRepresentation = new UserRepresentation();
            userRepresentation.setUsername(userKeycloak.getUsername());
            userRepresentation.setEmail(userKeycloak.getEmail());
            userRepresentation.setFirstName(userKeycloak.getFirstName());
            userRepresentation.setLastName(userKeycloak.getLastName());
            userRepresentation.setEnabled(true);


            Response result = usersResource.create(userRepresentation);
            responseKeycloak.setStatus(result.getStatus());

            if (responseKeycloak.getStatus() == 201) {
                String path = result.getLocation().getPath();
                responseKeycloak.setId(path.substring(path.lastIndexOf("/") + 1));
                CredentialRepresentation passwordCredential = new CredentialRepresentation();
                passwordCredential.setTemporary(false);
                passwordCredential.setType(CredentialRepresentation.PASSWORD);
                passwordCredential.setValue(userKeycloak.getPassword());
                usersResource.get(responseKeycloak.getId()).resetPassword(passwordCredential);

                RealmResource realmResource = getRealmResource();
                RoleRepresentation roleRepresentation = realmResource.roles().get("realm-supplier").toRepresentation();
                realmResource.users().get(responseKeycloak.getId()).roles().realmLevel().add(Arrays.asList(roleRepresentation));
                responseKeycloak.setMessage("usuario creado con éxito");
                responseKeycloak.setSuccess(true);
            } else if (responseKeycloak.getStatus() == 409) {
                responseKeycloak.setMessage("ese usuario ya existe");
            } else {
                responseKeycloak.setMessage("error creando el usuario");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return responseKeycloak;
    }

    private RealmResource getRealmResource() {
        Keycloak kc = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("ceabe")
                .password("ceabe").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
        return kc.realm(realm);
    }

    private UsersResource getUsersResource() {
        RealmResource realmResource = getRealmResource();
        return realmResource.users();
    }
}
