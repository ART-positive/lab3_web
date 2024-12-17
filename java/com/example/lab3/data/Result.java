package com.example.lab3.data;

import java.io.Serializable;
import java.util.Objects;

import com.sun.istack.NotNull;
import jakarta.persistence.*;

@Entity
public class Result implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id", nullable=false, unique=true)
    private Long id;
    @NotNull
    @Column(name="x", nullable=false)
    private String x;
    @NotNull
    @Column(name="y", nullable=false)
    private String y;
    @NotNull
    @Column(name="r", nullable=false)
    private String r;
    @NotNull
    @Column(name="is_hit", nullable=false)
    private boolean isHit;
    @NotNull
    @Column(name="current_time_millis", nullable=false)
    private String currentTimeMillis;
    @NotNull
    @Column(name="nano_time", nullable=false)
    private String nanoTime;

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x.length() > 8 ? x.substring(0, 8) : x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y.length() > 8 ? y.substring(0, 8) : y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r.length() > 8 ? r.substring(0, 8) : r;
    }

    public boolean getIsHit() {
        return isHit;
    }

    public void setIsHit(boolean hit) {
        isHit = hit;
    }

    public String getCurrentTimeMillis() {
        return currentTimeMillis;
    }

    public void setCurrentTimeMillis(String currentTimeMillis) {
        this.currentTimeMillis = currentTimeMillis;
    }

    public String getNanoTime() {
        return nanoTime;
    }

    public void setNanoTime(String nanoTime) {
        this.nanoTime = nanoTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Result result = (Result) o;
        return isHit == result.isHit &&
                x.equals(result.x) &&
                y.equals(result.y) &&
                r.equals(result.r);
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, r, isHit);
    }

    @Override
    public String toString() {
        return "Result{" +
                "x='" + x + '\'' +
                ", y='" + y + '\'' +
                ", r='" + r + '\'' +
                ", isHit=" + isHit +
                '}';
    }

    public String toJson() {
        return String.format("{\"x\": \"%s\", \"y\": \"%s\", \"r\":\"%s\", \"isHit\":%s, \"curTime\": \"%d\", \"dur\": %d}", x, y, r, isHit ? "true" : "false", currentTimeMillis, nanoTime);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}