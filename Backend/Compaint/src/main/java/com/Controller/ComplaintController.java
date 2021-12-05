package com.Controller;

import com.Bean.Compliant;
import com.Bean.User;
import com.Service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.TokenGenerator;

import java.util.Map;

@RestController
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @CrossOrigin
    @PostMapping(path = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody User user) {
        return new ResponseEntity<>(complaintService.login(user.getUserName(),user.getPassword()), HttpStatus.OK);
    }

    @GetMapping(path = "/getUser", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(){
        return  new ResponseEntity<>(complaintService.getAllUser(), HttpStatus.OK);
    }

    @GetMapping(path="/getAll",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAdminTable(){
        return new ResponseEntity<>(this.complaintService.getAdminTable(),HttpStatus.OK);
    }

    @PostMapping(path="/addUser",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addUser(@RequestBody User user){
        String[] name = user.getName().split(" ");
        if(name.length == 1) {
            user.setUserName(name[0]+"."+"kumar");
            user.setPassword(TokenGenerator.passwordGenrator(name[0]));
        }else {
            String fpart = name[0];
            String spart = name[1];
            user.setUserName(fpart+"."+spart);
            user.setPassword(TokenGenerator.passwordGenrator(fpart));
        }
        return new ResponseEntity<>(this.complaintService.addUser(user),HttpStatus.OK);
    }
    @PostMapping(path="/updateUser",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@RequestBody User user){
        return new ResponseEntity<>(this.complaintService.updateUser(user.getUserId(),user.getRole()),HttpStatus.OK);
    }

    @DeleteMapping(path="/deleteUser/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id){
        return new ResponseEntity<>(this.complaintService.deleteUser(id),HttpStatus.OK);
    }

    @PostMapping(path="/{trackingId}/{status}/{field}",produces = MediaType.APPLICATION_PROBLEM_JSON_VALUE)
    public ResponseEntity<?> updateComplaint(@PathVariable("trackingId") String trackingId,@PathVariable("status") String status,@PathVariable("field") String feild ){
        return new ResponseEntity<>(this.complaintService.updateComplaint(trackingId, status, feild),HttpStatus.OK);
    }

    @PostMapping(path ="/addEngineer/{id}/{trackingId}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addEngineer(@PathVariable("id") Integer id,@PathVariable("trackingId") String trackingId){
        return new ResponseEntity<>(this.complaintService.addEngineer(id, trackingId),HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(path="/addComplaint",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addComplaint(@RequestBody Compliant complaint) {
        System.out.println(complaint.getName() + " : " + complaint.getStatus());
        String trackingNumber = TokenGenerator.usingUUID().substring(0, 10);
        Map<String, String> out = this.complaintService.addComplaint(trackingNumber,complaint);
        System.out.println(out);
        return new ResponseEntity<>(out,HttpStatus.OK);
    }

}
