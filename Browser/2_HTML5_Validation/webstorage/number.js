var i;
for(i=0;i<=100; i++){
  postMessage(i);
  if(i == 100)
	i=0;
}