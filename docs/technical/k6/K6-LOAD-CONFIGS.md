## Example Load Configurations

### Baseline Test

Simulates a steady, low load to establish a performance baseline.

```javascript
export let options = {
    vus: 10,
    duration: '10m',
};
```

### Peak Hours Simulation

Mimics traffic during peak operational hours.

```javascript
export let options = {
    stages: [
        { duration: '10m', target: 100 },
        { duration: '1h', target: 500 }, // Peak load
        { duration: '10m', target: 100 },
    ],
};
```

### Stress Test

Gradually increases the load to find the system's limits.

```javascript
export let options = {
    stages: [
        { duration: '5m', target: 200 },
        { duration: '15m', target: 1000 }, // Beyond expected peak
        { duration: '5m', target: 200 },
    ],
};
```

### Spike Test

Tests the system’s reaction to sudden spikes in traffic.

```javascript
export let options = {
    stages: [
        { duration: '2m', target: 50 },
        { duration: '1m', target: 500 }, // Sudden spike
        { duration: '2m', target: 50 },
    ],
};
```

### Soak Test

Runs a moderate load continuously to check for slow memory leaks or performance degradation.

```javascript
export let options = {
    duration: '24h',
    vus: 50,
};
```

### Incremental Load Increase

Slowly increases load to observe how additional load affects performance.

```javascript
export let options = {
stages: [
{ duration: '20m', target: 100 }, // Incrementally add VUs
{ duration: '20m', target: 200 },
{ duration: '20m', target: 300 },
],
};
```

### High Volume Record Transactions

Focuses on high-volume patient record interactions.

```javascript
export let options = {
    stages: [
        { duration: '10m', target: 300 }, // Simulate high-volume transactions
    ],
};
```

### API Rate Limit Testing

Ensures API rate limits are enforced without impacting service availability.

```javascript
export let options = {
    stages: [
        { duration: '1m', target: 20 },
        { duration: '3m', target: 20 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        'http_req_failed': ['rate<0.05'], // Ensure less than 5% requests fail
    },
};
````

### Gradual Ramp-down

Observes how the system behaves as load decreases, useful for understanding de-scaling.

```javascript
export let options = {
    stages: [
        { duration: '30m', target: 200 }, // Start high
        { duration: '15m', target: 0 }, // Gradually reduce load
    ],
};
```

### Other Scripts

#### Gradual Ramp up and down with 10 mins duration for each stage

```javascript
export let options = {
    stages: [
        { duration: '10m', target: 25 }, // ramp up to 25 VUs over 10 minutes
        { duration: '10m', target: 25 }, // stay at 25 VUs for 10 minutes
        { duration: '10m', target: 0 },  // ramp down to 0 VUs over 10 minutes
    ],
    thresholds: {
        'http_req_duration{type:Events}': ['p(95)<800'],
    },
};
```

### Rapid ramp with high level of users

```javascript
export let options = {
    stages: [
        { duration: '1m', target: 4000 },
        { duration: '5m', target: 5000 },
        { duration: '5m', target: 5000 },
        { duration: '20s', target: 0 },
        // { duration: '1m', target: 25 },
    ],
    thresholds: {
        'http_req_duration{type:Events}': ['p(95)<1000'],
    }
};
```
#### Load config during different hours within the day

```javascript
export let options = {
    stages: [
         // Simulate a morning ramp-up to 50 users over 2 hours.
        { duration: '2h', target: 50 },
         // Peak user load midday.
        { duration: '3h', target: 150 },
         // Reduced user load in the afternoon.
        { duration: '2h', target: 70 }, 
        // Ramp down towards the evening.
        { duration: '2h', target: 30 },  
        // This pattern would then repeat.
    ],
    thresholds: {
        // You could add thresholds to ensure the response times are acceptable.
        'http_req_duration': ['p(95)<500']
    },
};
```
