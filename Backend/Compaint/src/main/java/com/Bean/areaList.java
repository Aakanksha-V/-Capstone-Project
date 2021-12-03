package com.Bean;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter

public class areaList {
    private int areaId;
    private String pinCode;
    private int managerId;

    @Override
    public String toString() {
        return "areaList{" +
                "areaId=" + areaId +
                ", pinCode=" + pinCode +
                ", managerId=" + managerId +
                '}';
    }
}
