<div class="body-wrapper">
  <div class="add">
    <input id="url" type="text" placeholder="Url" />
    <input type="submit" />
  </div>
  <% for (var i = 0; i < songs.length; i++) { %>
    <%= songs[i].embed %>
  <% } %>    
</div>
