package com.Service;

import com.Bean.Compliant;
import com.Bean.User;
import com.Dao.ComplaintDao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class ComplaintService {

    ComplaintDao complaintDao = null;

    public Map<String,String> login(String username, String password){

        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return this.complaintDao.login(username,password);
    }

    public List<List<String>> getAllUser(String roleType){
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return this.complaintDao.getAllUser();
    }

    public ResponseEntity<?> getComplaint(String role, int userId){
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ResponseEntity<>(complaintDao.getComplaint(role,userId), HttpStatus.OK);
    }

    public Map<String,String> addComplaint(String trackingId, Compliant complaint){
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return this.complaintDao.addComplaint(trackingId,complaint);
    }

    public ResponseEntity<?> addEngineer(int id,String trackingId){
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ResponseEntity<>(this.complaintDao.addEngineer(id, trackingId),HttpStatus.OK);
    }

    public ResponseEntity<?> getAdminTable(){
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ResponseEntity<>(this.complaintDao.getComplaint("ADMIN", 1),HttpStatus.OK);
    }

    public ResponseEntity<?> updateComplaint(String trackingId,String status,String field){
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return new ResponseEntity<>(this.complaintDao.updateComplaint(trackingId,status,field),HttpStatus.OK);
    }

    public List<List<String>> getAllUser(){
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return this.complaintDao.getAllUser();
    }

    public String addUser(User user) {
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return this.complaintDao.addUser(user);
    }

    public String updateUser(int id,String role) {
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return this.complaintDao.updateUser(id,role);
    }

    public String deleteUser(int id) {
        try {
            complaintDao = new ComplaintDao();
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SQLException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return this.complaintDao.deleteUser(id);
    }
}
