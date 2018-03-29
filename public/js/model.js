function setNginxVersion(version)
{
    $("#nginx_version").html(version);
}

function setNginxRtmpVersion(version)
{
    $("#nginx_rtmp_version").html(version);
}

function setTotalViewers(total)
{
    $("#total_viewers").html(total);
}

function setUpTime(time)
{
    $("#uptime").html(time);
}

function setBandwidthInPerSec(bytes)
{
    $("#bandwidth_in_per_sec").html(bytes);
}

function setBandwidthOutPerSec(bytes)
{
    $("#bandwidth_out_per_sec").html(bytes);
}

function setTotalBandwidthIn(bytes)
{
    $("#total_bandwidth_in").html(bytes);
}

function setTotalBandwidthOut(bytes)
{
    $("#total_bandwidth_out").html(bytes);
}

function setTotalRequest(request)
{
    $("#total_request").html(request);
}

function setCpuUse(percent)
{
    $("#cpu_used").html(percent);
}

function setRamUse(bytes)
{
    $("#memory_used").html(bytes);
}

function setLiveStream(data, container_name)
{
    var table = "";
    var language_play = $("#language_play").val();
    var language_drop = $("#language_drop").val();

    $.each(data, function (index,channel) {
        var v_w = 0;
        var v_h = 0;

        var v_fps = '';
        var v_codec = '';
        var v_profile = '';
        var v_level = '';

        var a_codec = '';
        var a_profile = '';
        var a_channels = '';
        var a_sample_rate = '';

        if (typeof channel.meta !== 'undefined') {
            v_w = channel.meta[0].video[0].width[0];
            v_h = channel.meta[0].video[0].height[0];

            v_fps = channel.meta[0].video[0].frame_rate[0];
            v_codec = channel.meta[0].video[0].codec[0];
            v_profile = channel.meta[0].video[0].profile[0];
            v_level = channel.meta[0].video[0].level[0];

            a_codec = channel.meta[0].audio[0].codec[0];
            a_profile = channel.meta[0].audio[0].profile[0];
            a_channels = channel.meta[0].audio[0].channels[0];
            a_sample_rate = channel.meta[0].audio[0].sample_rate[0];
        }

        var dropped = 'N/A';
        if (typeof channel.client !== 'undefined') {
            channel.client.forEach(function(elem) {
                if (typeof elem.publishing !== 'undefined') {
                    dropped = elem.dropped;
                }
            });
        }

        var name = "<td class='text-center'>"+channel.name[0]+"</td>";
        var resolution = "<td class='text-center'>"+ v_w + " X " + v_h+"</td>";

        var bw_in = "<td class='text-center'>"+byteToHuman(channel.bw_in[0])+"/s</td>";
        var bw_out = "<td class='text-center'>"+byteToHuman(channel.bw_out[0])+"</td>";
        var bytes_in = "<td class='text-center'>"+byteToHuman(channel.bytes_in[0])+"</td>";
        var bytes_out = "<td class='text-center'>"+byteToHuman(channel.bytes_out[0])+"</td>";
        var time  = "<td class='text-center'>"+secondsToHuman(channel.time[0] / 1000)+"</td>";
        var dropped = "<td class='text-center'>"+dropped+"</td>";
        var viewers = "<td class='text-center'><b>"+numeral(channel.nclients[0]).format('0,0')+"<b/></td>";
        var bw_video = "<td class='text-center' title='FPS: "+v_fps+", codec: "+v_codec+", profile: "+v_profile+", level: "+v_level+"'>"+byteToHuman(channel.bw_video[0])+"/s</td>";
        var bw_audio = "<td class='text-center' title='codec: "+a_codec+", profile: "+a_profile+", channels: "+a_channels+", sample: "+a_sample_rate+"'>"+byteToHuman(channel.bw_audio[0])+"/s</td>";

	    var play = "<td><button class='btn btn-default play_stream' data-stream-name='"+channel.name[0]+"' data-toggle='modal' data-target='#stream_popup'><i class='glyphicon glyphicon-play'></i> "+language_play+"</button></td>";
	    var drop = "<td><button class='btn btn-default drop_stream' data-stream-name='"+channel.name[0]+"'><i class='glyphicon glyphicon-stop'></i> "+language_drop+"</button></td>";

        table = table + "<tr>"+name+resolution+bw_in+bw_video+bw_audio+bytes_in+dropped+viewers+time+play+drop+"</tr>";
    });

    $("#"+container_name).html(table);

    playStreamEvent();
    dropStreamEvent();
}
