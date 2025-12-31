package com.cabinet.medical.admin.entity;

import com.cabinet.medical.admin.enums.RoleEnum;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@Entity
@DiscriminatorValue("SECRETAIRE")
public class Secretaire extends Utilisateur {

    public Secretaire(String login, String pwd, String nom, String prenom, String numTel) {
        super(null, login, pwd, nom, prenom, numTel, RoleEnum.SECRETAIRE);
    }
}