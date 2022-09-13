<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

const config = {
    type: 'doughnut',
    data: data,
  };

  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

<script>
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
</script>