package com.example.report.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class DashboardWidget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String widgetType; // e.g., "REVENUE_GRAPH", "ORDERS_TREND"
    private String configJson; // widget settings in JSON

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWidgetType() {
        return widgetType;
    }

    public void setWidgetType(String widgetType) {
        this.widgetType = widgetType;
    }

    public String getConfigJson() {
        return configJson;
    }

    public void setConfigJson(String configJson) {
        this.configJson = configJson;
    }

    // getters & setters
}
