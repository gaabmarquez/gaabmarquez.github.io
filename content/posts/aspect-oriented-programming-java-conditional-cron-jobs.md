---
title: "Aspect-Oriented Programming in Java: A Real-World Example with Conditional Cron Jobs"
date: "2025-02-02"
tags: ["Aspect-Oriented Programming", "Spring AOP", "Java Annotations", "Cron Jobs", "Scheduled Tasks", "Spring Boot"]
categories: ["Java", "Spring Framework", "Software Development", "Backend Engineering"]
description: "Use AOP to conditionally run cron jobs based on a maintenance mode flag in Spring Boot."
---

Imagine this: Your Java application is set up to run scheduled tasks at specific intervals, but there's a catch—during maintenance mode, you want to temporarily disable these jobs. Modifying each job individually to check for a maintenance flag can be tedious, repetitive, and error-prone. This is where **Aspect-Oriented Programming (AOP)** comes to the rescue.

In this post, we'll dive into **Aspect-Oriented Programming in Java** and explore how you can use it to conditionally run cron jobs based on a property, such as a "maintenance mode" flag.

---

## The Problem: Conditional Execution of Scheduled Jobs

Scheduled tasks in Spring are typically executed using the `@Scheduled` annotation. If you have dozens of tasks and want to disable them temporarily during maintenance, adding a `if` condition in each method is neither elegant nor maintainable.

With AOP, you can intercept the execution of these tasks and conditionally decide whether they should proceed—all without modifying the actual task logic.

---

## The Solution: AOP for Conditional Cron Jobs

### Step 1: Create a Custom Annotation

```java
package com.test.helpers;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ConditionalScheduled {
}
```

### Step 2: Implement the Aspect

```java
package com.test.helpers;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class ScheduledAspect {

    private final boolean maintenanceModeEnabled;

    public ScheduledAspect(@Qualifier("maintenance.mode.enabled") boolean maintenanceModeEnabled) {
        this.maintenanceModeEnabled = maintenanceModeEnabled;
    }

    @Around("@annotation(com.test.helpers.ConditionalScheduled)")
    public Object aroundScheduledMethod(ProceedingJoinPoint joinPoint) throws Throwable {
        if (maintenanceModeEnabled) {
            String methodName = joinPoint.getSignature().toShortString();
            log.info("Maintenance mode is ON. Skipping scheduled task: {}", methodName);
            return null;
        }
        return joinPoint.proceed();
    }
}
```

**Key points:**
- The `@Around` advice wraps the execution of the target method.
- `joinPoint.proceed()` calls the actual method if maintenance mode is disabled.
- The `maintenanceModeEnabled` flag determines whether to skip or execute the job.

### Step 3: Annotate Your Scheduled Tasks

```java
@Component
public class SampleJob {

    @Scheduled(cron = "0 0 * * * ?")
    @ConditionalScheduled
    public void runHourlyTask() {
        System.out.println("Executing hourly task...");
    }
}
```

### Step 4: Configure the Maintenance Mode Flag

```properties
# application.properties
maintenance.mode.enabled=true
```

---

## Why Use AOP for This?

1. **Decoupling Logic**: The decision to execute a task is separated from the task's logic.
2. **Reusability**: The aspect can be reused across multiple scheduled tasks.
3. **Ease of Maintenance**: Changes to the conditional logic only need to be made in one place.

---

## Final Thoughts

Aspect-Oriented Programming is a powerful tool in your Java arsenal, enabling you to handle cross-cutting concerns with elegance. In this example, we saw how AOP can simplify the conditional execution of cron jobs, reducing boilerplate code and making your application easier to maintain.
