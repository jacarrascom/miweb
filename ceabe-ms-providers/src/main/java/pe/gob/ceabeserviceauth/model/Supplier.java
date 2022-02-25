package pe.gob.ceabeserviceauth.model;

import org.checkerframework.common.aliasing.qual.Unique;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table
public class Supplier implements Serializable {

    @Id
    @Unique
    public String id;
    @Column
    public String ruc;
    @Column
    public String businessName;
    @Column
    public String email;
    @Column
    public String representative;
    @Column
    public String phone;
    @Column
    public String cellphone;

    @OneToMany(cascade = CascadeType.ALL)
    @Column
    public List<Category> categories;

    @OneToMany(cascade = CascadeType.ALL)
    @Column
    public List<Contact> contacts;


    public Supplier() {

    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRepresentative() {
        return representative;
    }

    public void setRepresentative(String representative) {
        this.representative = representative;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }
}
