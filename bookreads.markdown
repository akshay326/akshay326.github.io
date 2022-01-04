---
layout: page
title: Bookreads
permalink: /bookreads
---

<script src="https://www.goodreads.com/review/grid_widget/96697553.Books%20I've%20Read?cover_size=medium&hide_link=&hide_title=&num_books=30&order=a&shelf=read&sort=date_added&widget_id=1627567641"></script>


<style>
#goodreads {
  padding: 15vh 0;
}

@media only screen and (max-width: 600px) {
  #goodreads {
    padding: 5vh 6vw 10vh 6vw;
  }
}

/* books read */
.gr_grid_container {
  /* customize grid container div here. eg: width: 500px; */
}

.gr_grid_book_container {
  /* customize book cover container div here */
  float: left;
  width: 98px;
  height: 160px;
  padding: 0px 0px;
  overflow: hidden;
}


/* update widget */
#gr_updates_widget{
  border-radius: 1rem;
  -webkit-box-shadow: 0px 0px 4px 1px #595959, inset 0px 0px 0px 1px #7D730B;
  -moz-box-shadow: 0px 0px 4px 1px #595959, inset 0px 0px 0px 1px #7D730B;
  box-shadow: 0px 0px 4px 1px #595959, inset 0px 0px 0px 1px #7D730B;
  padding: 10px 0 0 10px;
  height: 650px;
  width: fit-content;
}

#gr_updates_widget p{
  padding:0px;
  margin:0;
  font-size: 14px;
}
</style>


<div id="goodreads" className="container">
    <div id="gr_grid_widget_1627567641" />
</div>

<div className="row justify-content-md-center m-2">
    <div className="col-xs-12 col-md-3">
    <h2>Book Update</h2>
    <div id="gr_updates_widget">
        <iframe
        id="the_iframe"
        title="Update"
        src="https://www.goodreads.com/widgets/user_update_widget?num_updates=5&user=96697553"
        frameBorder="0"
        width="100%"
        height="100%" />
    </div>
    </div>
</div>
