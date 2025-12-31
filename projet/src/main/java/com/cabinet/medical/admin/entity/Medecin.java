package com.cabinet.medical.admin.entity;

import com.cabinet.medical.enums.RoleEnum;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
@DiscriminatorValue("MEDECIN")
public class Medecin extends Utilisateur {

    @Column(columnDefinition = "TEXT")
    private String signature;

    public Medecin(String login, String pwd, String nom, String prenom, String numTel, String signature) {
        super(null, login, pwd, nom, prenom, numTel, RoleEnum.MEDECIN);
        this.signature = signature;
    }
}