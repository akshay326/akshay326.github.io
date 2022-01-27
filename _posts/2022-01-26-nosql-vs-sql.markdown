---
layout: post
title:  "Vertical and Horizontal Scaling in databases"
date:   2022-01-26 14:00:00 -0500
---


Before we delve into nature of scaling, let's dig the history of databases.

## NoSQL v/s SQL
SQL databases were developed in 1970's to reduce data duplication since data storage was costly compared to developer/maintaince costs then. NoSQL (or 'not SQL') databases were an alternative developed after the internet boom in 2000's to allow faster scaling, low database maintainence costs, and making schema changes easy.

## Vertical v/s Horizontal Scaling
> SQL databases require vertical scaling

Vertical scaling refers to manipulating resources (compute, storage, etc) built on a rigid base or architecture - schema in the case of a database - to achieve scaling. On the other hand, horizontal scaling means manipulating (adding or removing) replicas of a system to achieve. Advances in semiconductor technology resulted in affordable and larger storage solutions. This was followed in tandem by rapid adoption of cloud technologies.

## But how scaling affects SQL databases? 
Consider a hypothetical social media company that has a SQL database worth ~100GB in size (on RAM) stored on cloud, say an EC2 instance. If the platform suddenly experienced a ten-fold increase in traffic, it would require increasing the RAM of EC2 instance to 1TB roughly (or a lower value if platform developers come up with a way to optimize database schema in real-time). This might be a costly operation considering that a typical platform with over a million users can garner databases in petabytes!

On the other hand, if the company had a NoSQL database of the same size and experienced a ten-fold increase in traffic, it would require adding nine more EC2 instances with similar instances, orchestrated by Kubernetes or AWS Fargate.