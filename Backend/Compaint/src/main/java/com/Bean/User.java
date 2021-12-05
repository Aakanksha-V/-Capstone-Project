package com.Bean;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class User {
    private int userId;
    private String name;
    private String userName;
    private String password;
    private String role;

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
