const API_URL = 'http://localhost:5000/api';
const MQTT_URL = 'http://localhost:5001/mqtt';


$('#add_dev_floor').on('change', function() {  
  var floor = $(this).val();
  var rooms = $('#add_dev_room');

  rooms.empty();

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getRooms?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#rem_floor').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#rem_room');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getRooms?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#d_1_f').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#d_1_r');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getRooms?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});



$('#d_2_f').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#d_2_r');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getRooms?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#d_3_f').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#d_3_r');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getRooms?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#d_1_r').on('change',function() {
  if ($('#d_1_r') != undefined && $('#d_1_f') != undefined && ('#d_1_t') != undefined) {
    const devices = $('#d_1_device');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#d_1_f').val();
    const room = $('#d_1_r').val();
    const type = $('#d_1_t').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/remove?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});



$('#d_2_r').on('change',function() {
  if ($('#d_2_r') != undefined && $('#d_2_f') != undefined && ('#d_2_t') != undefined) {
    const devices = $('#d_2_device');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#d_2_f').val();
    const room = $('#d_2_r').val();
    const type = $('#d_2_t').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/remove?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});

$('#d_3_r').on('change',function() {
  if ($('#d_3_r') != undefined && $('#d_3_f') != undefined && ('#d_3_t') != undefined) {
    const devices = $('#d_3_device');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#d_3_f').val();
    const room = $('#d_3_r').val();
    const type = $('#d_3_t').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/remove?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});

$('#dev_data_f').on('change', function() {
  console.log('Inside change event');
  
  var floor = $(this).val();
  var rooms = $('#dev_data_room');

  rooms.empty();
  rooms.append($('<option>', {value:"", text: "--Select--"}));

  console.log('Selected floor:', floor);

  $.ajax({
    url: `${API_URL}/getRooms?floor=${floor}`,
    type: 'GET',
    success: function(data) {
      console.log('Retrieved rooms:', data);

      data.forEach(function(roomNumber) {
        rooms.append($('<option>', {
          value: roomNumber,
          text: roomNumber
        }));
      });

      console.log('Populated rooms:', rooms);
    },
    error: function(xhr, status, error) {
      console.log('Error:', error);
    }
  });
});


$('#dev_data_bt').on('click', function() {
  var floor = $('#dev_data_f').val();
  var room = $('#dev_data_room').val();
  var type = $('#dev_data_type').val();
  var name = $('#dev_data_dev').val();
  if ($('#dev_data_room') != undefined && $('#dev_data_f') != undefined && ('#dev_data_type') != undefined && ('#dev_data_dev') != undefined) {
    $.ajax({
    url: `${API_URL}/Data?floor=${floor}&type=${type}&room=${room}&name=${name}`,
    method: 'GET',
    success: (data) => {
      $('#data_container').empty();
      $('#data_container').append(`<h2>Device Data</h2><label>Name: ${name}</label><br><label>Type: ${type}</label><br><label>Floor: ${floor}</label><br><label>Room: ${room}</label><br><label>Data: ${data}</label><br><br>`);
      var chartOptions = {
        chart: {
          type: 'line'
        },
        title: {
          text: 'Device Data'
        },
        xAxis: {
          categories: 'DEVICE'
        },
        yAxis: {
          title: {
            text: 'Data'
          }
        },
        series: [{
          name: name,
          data: data
        }]
      };
      $(document).ready(function() {      $('#graph').highcharts(chartOptions);
    });
    },
    error: (err) => {
      console.log('Error:', err);
    }
  });
  }
});


$('#add_dev').on('click', function(){
    var name = $('#add_dev_name').val();
    var floor = $('#add_dev_floor').val();
    var room = $('#add_dev_room').val();
    var type = $('#add_dev_type').val();
    console.log(name);
    console.log(room);
    console.log(floor);
    console.log(type);
    if (type == '1') {
        $.ajax({
            url: `${API_URL}/lighting`,
            type: "POST",
            data: {
              name: name, 
              floor: floor,
              room: room 
            },
            success: function(response) {
              console.log(response); 
            },
            error: function(xhr, status, error) {
              console.log("Error: " + error); 
            }
        });
    }
    else if(type == '2'){
        $.ajax({
            url: `${API_URL}/aircon`,
            type: "POST",
            data: {
              name: name, 
              floor: floor,
              room: room 
            },
            success: function(response) {
              console.log(response); 
            },
            error: function(xhr, status, error) {
              console.log("Error: " + error); 
            }
        });
    }
    else if(type == '3'){
        $.ajax({
            url: `${API_URL}/security`,
            type: "POST",
            data: {
              name: name, 
              floor: floor,
              room: room 
            },
            success: function(response) {
              console.log(response); 
            },
            error: function(xhr, status, error) {
              console.log("Error: " + error); 
            }
        });
    }

    $('#new_device_floor').val("");
});

$('#dev_data_room').on('change',function() {
  if ($('#dev_data_room') != undefined && $('#dev_data_f') != undefined && ('#dev_data_type') != undefined) {
    const devices = $('#dev_data_dev');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#dev_data_f').val();
    const room = $('#dev_data_room').val();
    const type = $('#dev_data_type').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/removeDev?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});


$('#rem_room').on('change',function() {
  if ($('#rem_floor') != undefined && $('#rem_room') != undefined && ('#remove_device_type') != undefined) {
    const devices = $('#remove_device');
    console.log("yes, I am here");
    devices.empty();
    
    const floor = $('#rem_floor').val();
    const room = $('#rem_room').val();
    const type = $('#remove_device_type').val();
    console.log(floor, room, type);

    $.ajax({
      url: `${API_URL}/removeDev?floor=${floor}&type=${type}&room=${room}`,
      type: 'GET',
      success: function(data) {
        console.log('Retrieved devices:', data);  
        data.forEach(function(device) {
          devices.append($('<option>', {
            value: device.name,
            text: device.name
          }));
        });
  
        console.log('Populated rooms:', devices);
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

});


$('#remove_device_button').on('click', function () {
  const type = $('#remove_device_type').val();
  const floor = $('#rem_floor').val();
  const room = $('#rem_room').val();
  const device = $('#remove_device').val();

  if (type && floor && room && device) {
    $.ajax({
      url: `${API_URL}/remove`,
      type: 'DELETE',
      data: { type: type, floor: floor, room: room, device: device },
      success: function () {
        console.log('Device removed successfully');
        $('#rem_floor').val("");
  
      },
      error: function (xhr, status, error) {
        console.error('Error removing device:', error);
      }
    });
  } else {
    console.error('Missing required fields');
  }
});

$('#d_pref').on('click', function () {
  const type1 = $('#d_1_t').val();
  const floor1 = $('#d_1_f').val();
  const room1 = $('#d_1_r').val();
  const device1 = $('#d_1_device').val();
  const type2 = $('#d_2_t').val();
  const floor2 = $('#d_2_f').val();
  const room2 = $('#d_2_r').val();
  const device2 = $('#d_2_device').val();
  const type3 = $('#d_3_t').val();
  const floor3 = $('#d_3_f').val();
  const room3 = $('#d_3_r').val();
  const device3 = $('#d_3_device').val();

  if (type1 && floor1 && room1 && device1 && type2 && floor2 && room2 && device2 && type3 && floor3 && room3 && device3) {
    $.ajax({
      url: `${MQTT_URL}/pref`,
      type: 'POST',
      data: { d1:{type: type1, floor: floor1, room: room1, device: device1}, d2:{type: type2, floor: floor2, room: room2, device: device2}, d3:{type: type3, floor: floor3, room: room3, device: device3}},
      success: function () {
        console.log('Pref set, successfully');
        // $('#rem_floor').val("");
  
      },
      error: function (xhr, status, error) {
        console.error('Error pref device:', error);
      }
    });
  } else {
    console.error('Missing required fields');
  }
});

$(document).ready(function() {
    const table = $('#lighting_dev');
    console.log('yep')
    $.ajax({
      url: `${API_URL}/lighting`,
      method: 'GET',
      success: function(data) {
        data.forEach(function(lighting) {
          const row = $('<tr></tr>');
          $('<td></td>').text(lighting.name).appendTo(row);
          $('<td></td>').text(lighting.room).appendTo(row);
          $('<td></td>').text(lighting.floor).appendTo(row);
          $('<td></td>').text(lighting.status).appendTo(row);
          table.append(row);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
      }
    });
  });
  
  $('#new_device_floor').on('change', function() {

  });

  $(document).ready(function() {
    const table = $('#security_dev');
    $.ajax({
      url: `${API_URL}/security`,
      method: 'GET',
      success: function(data) {
        data.forEach(function(lighting) {
          const row = $('<tr></tr>');
          $('<td></td>').text(lighting.name).appendTo(row);
          $('<td></td>').text(lighting.room).appendTo(row);
          $('<td></td>').text(lighting.floor).appendTo(row);
          $('<td></td>').text(lighting.status).appendTo(row);
          table.append(row);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
      }
    });
  });
  
  $(document).ready(function() {
    const table = $('#acond_dev');
    console.log('yep')
    $.ajax({
      url: `${API_URL}/aircon`,
      method: 'GET',
      success: function(data) {
        data.forEach(function(lighting) {
          const row = $('<tr></tr>');
          $('<td></td>').text(lighting.name).appendTo(row);
          $('<td></td>').text(lighting.room).appendTo(row);
          $('<td></td>').text(lighting.floor).appendTo(row);
          $('<td></td>').text(lighting.status).appendTo(row);
          table.append(row);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('Error:', errorThrown);
      }
    });
  });

// 
// 
// 
// 

// mqtt stuff

$('#send-command').on('click', function() {
  const deviceId = $('#deviceId').val();
  const command = $('#command').val();
  $.post(MQTT_URL, { deviceId, command })
  .then(response => {
  location.href = '/';
      })
      });




