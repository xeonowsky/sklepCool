package com.example.SklepCool.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


@Service
public class jwtService {
    private static final String SECRETKEY="123456789MojSekretnyKluczDlaJWT1234567891069";

    public String extractUsername(String token){
        return extractClaim(token,Claims::getSubject);
    }

    private Claims extractAllClaims(String token){
        return Jwts.
                parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token).getBody();
    }
    public <T> T extractClaim(String token, Function<Claims,T> claimsTFunction){
        final Claims claims =extractAllClaims(token);

        return claimsTFunction.apply(claims);
    }

    private Key getSignKey() {
        byte[]keyByte= Decoders.BASE64.decode(SECRETKEY);
        return Keys.hmacShaKeyFor(keyByte);
    }

    public String generateToken(UserDetails userDet) {
        return generateToken(new HashMap<>(),userDet);
    }

    public String generateToken(
            Map<String, Object> extraClaims, UserDetails userDetails){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .claim("password",userDetails.getPassword())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();

    }
    public boolean isTokenValid(String token,UserDetails userDet){
        final String username=extractUsername(token);
        return username.equals(userDet.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }
}
