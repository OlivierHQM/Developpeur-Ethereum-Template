function VotingStatus() {

  




  return (
    <div className="VotingStatus">
      <h3>Voting Status</h3>
      <span id="current_status"></span>
      <script type="text/javascript">
        let current_status = "Resgistering voters";
      </script>
      <script type="text/javascript">
        document.write(current_status)
      </script>
    </div>
  );
}

export default VotingStatus;
