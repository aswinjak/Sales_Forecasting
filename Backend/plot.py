import pandas as pd
import sys
from statsmodels.tsa.arima.model import ARIMA
import pmdarima as pm
import matplotlib.pyplot as plt
import numpy as np
s=sys.argv
periodicity=s[1]
n_value=s[2]
data = pd.read_csv('sales.csv', index_col=0, parse_dates=True)
valm=7
if(periodicity=='weekly'):
    data=data.resample('W').sum()
    n_value=int(n_value)
if(periodicity=='monthly'):
    data=data.resample('M').sum()
    valm=7
if(periodicity=='yearly'):
    data=data.resample('M').sum()
    n_value=int(n_value)*12
    valm=1
data=data[:-1]

model = pm.auto_arima(data, start_p=0, start_q=0, max_p=5, max_q=5,
                      seasonal=True, trace=True, error_action='ignore',D=1,d=0,
                      suppress_warnings=True, stepwise=True,m=valm)
pred,conf=model.predict(int(n_value)+2,return_conf_int=True,alpha=0.60)
last=data[::-1]
last=last[0:1]
temp=[]
len_of_conf=len(conf)
temp.append(last.values[0][0])
temp.append(last.values[0][0])
conf=np.insert(conf,0,temp).reshape(len_of_conf+1,2)
new_row = pd.DataFrame({'Date':last.index[0],'Sales':np.nan,0:last.values[0][0]},index=[0])
new_row=new_row.set_index('Date')
pred=pd.concat([new_row,pred])
fig=plt.figure(figsize=(15,7))
plt.plot(data)
plt.plot(pred,color='black')
plt.fill_between(pred.index,
                     conf[:, 0], conf[:, 1],
                     alpha=0.8, color='grey',
                     label="Confidence Intervals")
plt.legend(['Actual', 'Predicted'])
plt.xlabel('Date')
plt.ylabel('Sales')
plt.title('Sales Forecast')
plt.savefig('temp.png')