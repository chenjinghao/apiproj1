const data = {
    labels: [
        'Saving',
        'Saving for goal',
        'Investment',
        'Living expenses',
        'others'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [100, 50, 100, 50, 60],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(84, 194, 54)',
            'rgb(194, 54, 182)'
        ],
        hoverOffset: 5
    }]
};

const config = {
    type: 'pie',
    data: data,
    options: {}
};


const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

//Redirect click on icon to welcome page
function homeIconClick() {
  location.href = "/frontend/welcome.html"
}