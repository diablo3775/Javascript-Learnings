const buildDropdown = (callback) => {
    $.ajax({
        type: "POST",
        url: appObj.siteUserControllerUrl + "getJiraTeamNames",
        dataType: 'json',
        success: function (data) {
            var keyName = data;
            var dropdownContent = '';
            dropdownContent += '<select class="form-control" name="fo_jira_team_id">';
            keyName.forEach(function (key) {
                dropdownContent += '<option value="' + key.fo_key_id + '">' + key.key_name + '</option>';
            });
            dropdownContent += '</select>';
            callback(dropdownContent);
        }
    });
}

const appendDropdown = (dropdownContent) => {
    $('#jiraTeamsDropdown').append(dropdownContent);
}

	buildDropdown(appendDropdown);
