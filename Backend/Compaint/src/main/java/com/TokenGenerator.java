package com;

import java.util.Random;
import java.util.UUID;

public class TokenGenerator {
    public static String usingUUID() {
        UUID randomUUID = UUID.randomUUID();
        return randomUUID.toString().replaceAll("-", "");
    }
    public static String passwordGenrator(String name) {
        Random rnd = new Random();
        int number = rnd.nextInt(9999);
        return name+"@"+String.format("%04d", number);
    }
}
