from matplotlib import pyplot as plt
import math

ts = []
xs = []
ys = []
a_vals = []
b_vals = []
period = 0

lines = []
with open('points.txt', 'r', encoding='utf-16') as f:
    lines = f.readlines()

i = 0
try:
    period = float(lines[i])
    i += 1
    while (i < len(lines) and lines[i].strip().encode('utf-16') != '----'.encode('utf-16')):
        a_vals.append(float(lines[i].strip()))
        i += 1
    i += 1
    while (i < len(lines) and lines[i].strip().encode('utf-16') != '----'.encode('utf-16')):
        b_vals.append(float(lines[i].strip()))
        i += 1
    i += 1
    while (i < len(lines) and lines[i].strip().encode('utf-16') != '----'.encode('utf-16')):
        ts.append(float(lines[i].strip()))
        i += 1
    i += 1
    while (i < len(lines) and lines[i].strip().encode('utf-16') != '----'.encode('utf-16')):
        xs.append(float(lines[i].strip()))
        i += 1
    i += 1
    while (i < len(lines) and lines[i].strip().encode('utf-16') != '----'.encode('utf-16')):
        ys.append(float(lines[i].strip()))
        i += 1
except:
    print("\'" + lines[i].strip() + "\'")
    print(lines[i].strip().encode("utf-8") == '----')
    print("ERROR")

# print("Lens: ", len(ts), len(xs), len(ys))
# print(ts)

for i in range(1, len(a_vals)):
    subarr = []
    for t in ts:
        subarr.append(a_vals[i]*math.cos(i*2*math.pi/period*t) + b_vals[i]*math.sin(i*2*math.pi/period*t))
    plt.plot(ts, subarr, linestyle=":")

plt.plot(ts, ys)
plt.plot(ts, xs, linestyle='--')
# plt.grid(True)
plt.show()