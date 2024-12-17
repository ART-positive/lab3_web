package com.example.lab3.data;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


@Named("results")
@ApplicationScoped
public class ResultsBean implements Serializable {
    private List<Result> results = DBManager.getInstance().getCollectionFromDataBase();

    private Result point = new Result();

    public Result getPoint() {
        return point;
    }

    public void setPoint(Result point) {
        this.point = point;
    }


    public void addResult() {
        validateInput(point);
        long start = System.nanoTime();
        Result pointCopy = new Result();
        pointCopy.setX(point.getX());
        pointCopy.setY(point.getY());
        pointCopy.setR(point.getR());
        pointCopy.setIsHit(checkResult(point));
        pointCopy.setCurrentTimeMillis(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").
                format(new Date(System.currentTimeMillis())));
        pointCopy.setNanoTime(String.valueOf(System.nanoTime() - start));
        this.results.add(pointCopy);

        EntityManager entityManager = DBManager.getInstance().entityManager;
        entityManager.getTransaction().begin();
        entityManager.merge(pointCopy);
        entityManager.flush();
        entityManager.getTransaction().commit();
        point.setY("");
        point.setX("");
    }

    private void validateInput(Result point) {
        if (point.getX() == null || point.getY() == null || point.getR() == null) {
            throw new IllegalArgumentException("Поля X, Y и R обязательны.");
        }
        try {
            point.setY(point.getY().replace(',', '.'));
            point.setR(point.getR().replace(',', '.'));
            double x = Double.parseDouble(point.getX());
            double y = Double.parseDouble(point.getY());
            double r = Double.parseDouble(point.getR());
            if (x < -10 || x > 10) throw new IllegalArgumentException("X должен быть в диапазоне от -10 до 10.");
            if (y < -10 || y > 10) throw new IllegalArgumentException("Y должен быть в диапазоне от -10 до 10.");
            if (r < 0) throw new IllegalArgumentException("R должен быть в диапазоне больше 0.");
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Значения X, Y и R должны быть числами.");
        }
    }

    public static boolean checkResult(Result point) {
        double x = Double.parseDouble(point.getX());
        double y = Double.parseDouble(point.getY());
        double r = Double.parseDouble(point.getR());
        if (x <= 0 && y >= 0 && x >= -r / 2 && y <= r) return true; // rectangle
        if (x <= 0 && y <= 0 && y >= -2.0 * x - r) return true; // triangle
        return x >= 0 && y <= 0 && x * x + y * y <= r * r; // arc
    }

    public int getCount() {
        return this.results.size();
    }

    public List<Result> getResults() {
        return results;
    }

    @Override
    public String toString() {
        return "ResultsBean{" +
                "results=" + results +
                '}';
    }

    public void clearResults() {
        if (results != null) {
            results.clear();
        }
        DBManager.getInstance().entityManager.getTransaction().begin();
        DBManager.getInstance().entityManager.createQuery("delete from Result").executeUpdate();
        DBManager.getInstance().entityManager.getTransaction().commit();
    }
}