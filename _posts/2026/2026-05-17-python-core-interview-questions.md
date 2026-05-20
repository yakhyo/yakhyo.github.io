---
layout: post
title: "Python Core Interview Questions and Answers: Clear, Practical Explanations"
date: 2026-05-17 12:00:00 +0900
modified_date: 2026-05-19 12:00:00 +0900
comments: true
categories: python
tags: [python, interview-prep, async, generators, concurrency]
description: "Practical Python interview answers for core topics like data structures, object identity, memory management, the GIL, generators, decorators, and async FastAPI behavior."
custom_css: mermaid
custom_js: mermaid
---

Python interview questions have a strange way of sounding easy right up until you answer them out loud. You may know what a list is, what the GIL does, or why `async` exists, but an interview answer needs more than a keyword. It has to be clear, accurate, and practical.

This guide focuses on that middle ground: explanations that are correct enough to stand up to follow-up questions, but still natural enough that you could actually say them in a conversation.

If you want a simple answering pattern, use this:

1. Start with the definition.
2. Explain what it means in normal code.
3. Give one practical example.
4. Mention one tradeoff or common mistake.

Each question starts with a one-line **short answer** for quick review, then expands into examples, gotchas, and a version of the answer I would actually say in an interview.

## Interview Map

Most of these questions fall into three buckets: Python objects, runtime behavior, and concurrency.

<div class="mermaid">
flowchart TD
    A["Python Core Interview Prep"] --> B["Data Structures and Identity"]
    A --> C["Runtime and Execution"]
    A --> D["Concurrency and Async"]
    B --> B1["list, tuple, set, dict"]
    B --> B2["is vs =="]
    C --> C1["memory management"]
    C --> C2["iterators and generators"]
    C --> C3["decorators"]
    C --> C4["context managers"]
    D --> D1["GIL"]
    D --> D2["async and await"]
    D --> D3["blocking inside async endpoints"]

    classDef hub fill:#1e90ff,stroke:#0066cc,color:#ffffff;
    classDef g1 fill:#e8f2ff,stroke:#1e90ff,color:#0b3d91;
    classDef g2 fill:#efe9ff,stroke:#7c3aed,color:#4c1d95;
    classDef g3 fill:#e6f7f1,stroke:#10b981,color:#065f46;
    class A hub;
    class B,B1,B2 g1;
    class C,C1,C2,C3,C4 g2;
    class D,D1,D2,D3 g3;
</div>

## 1. What Is the Difference Between a List, Tuple, Set, and Dictionary in Python?

> **Short answer:** A list is an ordered mutable sequence, a tuple is an ordered immutable sequence, a set is an unordered collection of unique items, and a dict maps unique keys to values.

These four container types overlap just enough to confuse people, but they are built for different jobs:

- `list` is the standard mutable sequence type.
- `tuple` is an immutable sequence.
- `set` is an unordered collection of distinct hashable objects.
- `dict` is Python's standard mapping type: it maps hashable keys to values.

Here is the practical version:

| Type | Best mental model | Ordered | Mutable | Duplicate values | Main strength |
| ---- | ----------------- | ------- | ------- | ---------------- | ------------- |
| `list` | an editable sequence | Yes | Yes | Yes | index-based access |
| `tuple` | a fixed sequence | Yes | No | Yes | safety, hashability in the right cases |
| `set` | unique items | No | Yes | No | fast membership tests |
| `dict` | a lookup table | Yes, by insertion order | Yes | keys must be unique | key-based lookup |

### Which Are Mutable?

- `list`, `set`, and `dict` are mutable.
- `tuple` is immutable.

That means you can add, remove, or update entries in a list, set, or dictionary after creation. A tuple is different: once the tuple exists, its slots are fixed.

```python
nums = [1, 2, 3]
nums[0] = 99          # fine, lists are mutable

point = (1, 2, 3)
point[0] = 99         # TypeError: 'tuple' object does not support item assignment
```

### Which Are Hashable?

An object is hashable when Python can give it a stable hash value for its lifetime and compare it reliably with other objects. That is what allows the object to live inside a `set` or be used as a `dict` key.

In this group:

- `list` is not hashable.
- `set` is not hashable.
- `dict` is not hashable.
- `tuple` can be hashable, but only if all of its elements are hashable too.

```python
point = (10, 20)
cache = {point: "seen"}
```

That works because `point` is a tuple of hashable integers.

### When Would You Use a Set Instead of a List?

Use a set when uniqueness matters or when you care about fast membership checks.

For example, `set()` is a simple way to remove duplicates from a sequence:

```python
names = ["alice", "bob", "alice", "charlie"]
unique_names = set(names)
```

And if you need to ask "have I seen this before?" many times, a set is usually a better fit than scanning a list:

```python
seen = {"alice", "bob", "charlie"}

if "alice" in seen:
    print("duplicate")
```

### How I Would Say It in an Interview

> A list and tuple are both ordered sequences, but a list is mutable and a tuple is not. A set stores unique values and is especially useful for membership checks and deduplication. A dictionary maps keys to values and is the right choice when I want fast lookup by key.

## 2. What Is the Difference Between `is` and `==`?

> **Short answer:** `==` compares values; `is` compares identity, that is, whether two names point to the exact same object in memory.

This is one of those small Python questions that quickly reveals whether someone understands objects or has only memorized syntax.

- `==` checks whether two objects have the same value.
- `is` checks whether two references point to the same object.

Every Python object has an identity, a type, and a value. The `is` operator only cares about the identity part.

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)  # True
print(a is b)  # False
```

These two lists have the same value, but they are not the same list object. `id()` makes that concrete:

```python
a = [1, 2, 3]
b = a
c = [1, 2, 3]

print(a is b)            # True  -> same object
print(id(a) == id(b))    # True
print(a == c)            # True  -> same value
print(a is c)            # False -> different objects
print(id(a) == id(c))    # False
```

### What Does Object Identity Mean?

Object identity answers "which object is this?", not "what value does it hold?"

If two variables refer to the exact same underlying object, `is` returns `True`.

```python
a = []
b = a

print(a is b)  # True
```

### Why Can `a is b` Be True for Small Integers or Strings?

Because CPython sometimes reuses immutable objects, especially small integers and interned strings.

For immutable types, Python implementations are free to return a reference to an existing object with the same type and value. That is why this can happen:

```python
a = 10
b = 10
print(a is b)  # Often True in CPython
```

But that is an implementation detail. It is useful to know, and dangerous to depend on.

### Best Practice

Use:

- `==` for value comparison
- `is` for identity checks, especially for singletons like `None`

```python
if result is None:
    ...
```

### How I Would Say It in an Interview

> `==` is for value equality, while `is` is for object identity. I use `==` for normal comparisons and `is` mainly when I need to check whether something is literally the same object, especially `is None`.

## 3. Explain Python's Memory Management

> **Short answer:** CPython frees an object immediately when its reference count drops to zero, and a separate cyclic garbage collector reclaims reference cycles that counting alone can never free.

At a high level, Python handles memory for you. In a CPython interview answer, the two ideas that matter most are reference counting and cyclic garbage collection.

### What Is Reference Counting?

A reference count is the number of active references to an object. When that count drops to zero, CPython can deallocate the object right away.

```python
x = [1, 2, 3]
y = x
del x
del y
```

Once nothing refers to that list anymore, CPython can reclaim it. You can watch the count change with `sys.getrefcount()`:

```python
import sys

x = []
print(sys.getrefcount(x))  # 2  (x, plus the temporary argument to getrefcount)
y = x
print(sys.getrefcount(x))  # 3
del y
print(sys.getrefcount(x))  # 2
```

The count is one higher than most people expect because passing `x` into `getrefcount()` creates a temporary reference. Mentioning that detail is a nice signal that you have actually used the tool.

### What Is Garbage Collection?

Garbage collection fills the gap that reference counting cannot cover. The main case is a reference cycle.

### What Are Circular References?

A circular reference happens when objects keep references to each other, so their reference counts never reach zero even though the program no longer needs them.

```python
a = {}
b = {}

a["other"] = b
b["other"] = a
```

Now `a` points to `b`, and `b` points back to `a`.

If the rest of the program stops referring to both objects, the pair can still keep each other alive. That is why CPython also has a cyclic garbage collector.

<div class="mermaid">
flowchart LR
    A["Object A"] --> B["Object B"]
    B --> A
    C["No outside references remain"] --> D["Reference counts do not reach zero"]
    D --> E["Garbage collector detects unreachable cycle"]

    classDef bad fill:#fdeaea,stroke:#ef4444,color:#991b1b;
    classDef step fill:#fff3e0,stroke:#f59e0b,color:#92400e;
    classDef good fill:#e6f7f1,stroke:#10b981,color:#065f46;
    class A,B bad;
    class C,D step;
    class E good;
</div>

### Why This Matters in Real Projects

Most of the time you do not manage memory manually in Python, but object lifetime still matters.

Common real-world mistakes include:

- large cached objects staying alive too long
- long-running services holding references by accident
- circular references in complex object graphs
- forgetting to close files, sockets, or database connections

### How I Would Say It in an Interview

> In CPython, memory management is based first on reference counting. When an object's reference count drops to zero, it can be deallocated. On top of that, Python has a garbage collector for cyclic references, because reference counting alone cannot clean up objects that keep each other alive.

## 4. What Is the GIL?

> **Short answer:** The GIL lets only one thread execute Python bytecode at a time per process, so threads do not speed up CPU-bound Python, but they still help I/O-bound work because the GIL is released during blocking I/O.

The GIL is the Global Interpreter Lock in CPython. In day-to-day terms, it means only one thread at a time can execute Python bytecode inside a single interpreter process.

The lock exists because CPython's interpreter state and object model are not fully thread-safe without coordination. The GIL is the coordination mechanism.

### Why Does Python Have the GIL?

Historically, it made CPython's memory management and object model simpler and safer, especially around shared state and reference counting.

That does not mean it is good for every workload. It means it is a tradeoff.

### How Does It Affect Multithreading?

If your code is CPU-bound and written mostly in pure Python, threads often do not speed it up the way people expect. The threads still compete for the GIL.

So if you start four Python threads for four heavy CPU tasks, that does not automatically mean four cores are running Python bytecode in parallel.

```python
import threading, time

def cpu_task():
    total = 0
    for _ in range(20_000_000):
        total += 1

start = time.perf_counter()
threads = [threading.Thread(target=cpu_task) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print(f"two threads: {time.perf_counter() - start:.2f}s")
# Roughly the same as running cpu_task() twice in a row — the threads
# spend their time contending for the GIL, not running in parallel.
```

One modern nuance is worth knowing: CPython 3.13 introduced an experimental, opt-in free-threaded build (PEP 703) that can run without the GIL. It is not the default, and most libraries are not validated for it yet. For interviews, the GIL is still the right baseline assumption, but mentioning the free-threaded work shows you are current.

### When Is Multithreading Still Useful?

Very often, for I/O-bound work.

CPython can release the GIL around potentially blocking I/O operations such as file reads and writes. That is why threads are still useful for:

- network requests
- database waits
- file I/O
- external API calls

### How Would You Handle CPU-Bound Work?

For CPU-heavy work, the better answers are usually:

- `multiprocessing`
- native extensions that release the GIL
- vectorized libraries such as NumPy
- worker systems or external services

<div class="mermaid">
flowchart TD
    A["What kind of work is this?"] --> B{"Mostly waiting on I/O?"}
    B -->|Yes| C["Threads or async are often a good fit"]
    B -->|No| D{"Mostly CPU-bound Python code?"}
    D -->|Yes| E["Prefer multiprocessing, native code, or external workers"]
    D -->|No| F["Choose based on library support and architecture"]

    classDef start fill:#e8f2ff,stroke:#1e90ff,color:#0b3d91;
    classDef decision fill:#fff3e0,stroke:#f59e0b,color:#92400e;
    classDef good fill:#e6f7f1,stroke:#10b981,color:#065f46;
    classDef neutral fill:#f1f5f9,stroke:#64748b,color:#1f2937;
    class A start;
    class B,D decision;
    class C,E good;
    class F neutral;
</div>

### Important Nuance

Do not say "Python cannot do multithreading." That is too blunt and not correct.

A better answer is:

> CPython supports threads, but the GIL limits parallel execution of Python bytecode in a single process. Threads still help a lot for I/O-bound workloads.

## 5. What Is an Iterator in Python?

> **Short answer:** An iterator is an object with `__next__()` that yields items one at a time and raises `StopIteration` when exhausted; an iterable is anything that can hand you a fresh iterator via `iter()`.

An iterator represents a stream of data. Repeated calls to `__next__()` return the next item, and when there is nothing left, the iterator raises `StopIteration`.

An iterator also implements `__iter__()`, which returns the iterator itself.

```python
nums = iter([1, 2, 3])

print(next(nums))  # 1
print(next(nums))  # 2
print(next(nums))  # 3
print(next(nums))  # raises StopIteration — the stream is exhausted
```

### Writing Your Own Iterator

Any object can become an iterator if it implements `__iter__` and `__next__`.

```python
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in Countdown(3):
    print(n)        # 3, 2, 1

print(list(Countdown(3)))  # [3, 2, 1]
```

A `for` loop calls `iter()` once, then calls `next()` repeatedly until `StopIteration`. That is why these two methods are enough to make a custom object work in loops, comprehensions, and `list()` calls.

### Iterable vs Iterator

This distinction matters.

- An iterable is something you can loop over.
- An iterator is the object that actually produces the next value.

```python
items = [1, 2, 3]  # iterable
it = iter(items)   # iterator
```

A list can produce a fresh iterator each time. An iterator itself is usually single-pass and gets exhausted.

```python
items = [1, 2, 3]
print(list(items))  # [1, 2, 3]
print(list(items))  # [1, 2, 3]  -> the iterable can be reused

it = iter(items)
print(list(it))     # [1, 2, 3]
print(list(it))     # []         -> the iterator is now exhausted
```

### How I Would Say It in an Interview

> An iterator is the object that yields values one by one through `__next__()`. An iterable is any object that can give me an iterator. A list is iterable, but the object returned by `iter(list_obj)` is the iterator.

## 6. What Is a Generator?

> **Short answer:** A generator is a lazy iterator built with `yield`; it produces values one at a time and preserves its local state between calls, so it avoids materializing the whole result in memory.

A generator is one of Python's nicest features because it lets you build an iterator without writing the iterator class by hand.

Technically, a generator function is a function that uses `yield`. Calling it returns a generator iterator.

```python
def count_up_to(n):
    current = 1
    while current <= n:
        yield current
        current += 1

for value in count_up_to(3):
    print(value)              # 1, 2, 3

print(list(count_up_to(3)))   # [1, 2, 3]
```

The whole `Countdown` iterator class from the previous question collapses into a few lines as a generator. Same behavior, much less boilerplate:

```python
def countdown(start):
    while start > 0:
        yield start
        start -= 1

print(list(countdown(3)))  # [3, 2, 1]
```

### How Does `yield` Work?

`yield` pauses the function and sends a value back to the caller. When iteration continues, the function resumes from where it left off, with its state preserved.

That is why generators are lazy: they compute values only when the caller asks for them.

### Why Are Generators Memory-Efficient?

Because they do not build the whole result upfront.

If you are processing a large file, a large query result, or a stream of events, yielding one item at a time is often much cheaper than building a list of everything first.

```python
import sys

nums_list = [x for x in range(1_000_000)]   # builds the whole list
nums_gen  = (x for x in range(1_000_000))   # builds nothing yet

print(sys.getsizeof(nums_list))  # ~8 MB
print(sys.getsizeof(nums_gen))   # ~200 bytes, no matter how large the range is
```

```python
def read_ids(path):
    with open(path) as f:
        for line in f:
            yield int(line.strip())
```

### When Is a Generator Better Than a List?

When you only need one pass.

If you need to scan a huge dataset once, a generator is often the right tool. If you need indexing, slicing, or multiple passes over the same data, a list may be the better choice.

### How I Would Say It in an Interview

> A generator is a lazy iterator, usually created by a function that uses `yield`. It gives values one at a time, preserves its state between yields, and is often much more memory-efficient than building a full list upfront.

## 7. What Is a Decorator?

> **Short answer:** A decorator is a callable that takes a function and returns a replacement, letting you add behavior like logging, caching, or auth around it without editing its body.

A decorator is a callable that takes something, often a function, and returns a replacement for it. In practice, it lets you add behavior around a function without rewriting that function's core logic.

Typical use cases:

- logging
- timing
- retries
- authentication
- caching
- instrumentation

### Simple Logging Decorator

```python
from functools import wraps

def log_calls(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

print(add.__name__)  # 'add' — preserved because of @wraps
```

### What Does `functools.wraps` Do?

`functools.wraps()` preserves metadata from the original function, such as:

- `__name__`
- `__doc__`
- other wrapper metadata used by tooling and frameworks

Without it, the wrapped function often looks like it is just called `wrapper`. That is annoying in debugging and can break frameworks that rely on introspection.

```python
def log_calls(func):
    def wrapper(*args, **kwargs):   # no @wraps this time
        return func(*args, **kwargs)
    return wrapper

@log_calls
def add(a, b):
    return a + b

print(add.__name__)  # 'wrapper' — the original identity is lost
```

### How I Would Say It in an Interview

> A decorator wraps a function so I can add behavior around it without changing the original logic. I use them for cross-cutting concerns like logging or auth. I also use `functools.wraps` so the wrapped function keeps its original metadata.

## 8. What Is a Context Manager?

> **Short answer:** A context manager defines setup and teardown through `__enter__` and `__exit__`, so a `with` block guarantees the teardown runs even if the body raises an exception.

The everyday use is the `with` statement. It acquires a resource, hands it to the block, and releases it on exit no matter how the block ends.

```python
with open("data.txt") as f:
    data = f.read()
# f is closed here automatically, even if read() raised
```

### Creating a Class-Based Context Manager

An object is a context manager if it implements `__enter__` and `__exit__`. `__enter__` runs on the way in, and its return value is bound by `as`. `__exit__` runs on the way out.

```python
import time

class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"took {self.elapsed:.3f}s")
        return False  # falsy -> any exception is re-raised, not swallowed

with Timer() as t:
    sum(range(1_000_000))
# took 0.0xx s
```

`__exit__` receives the exception type, value, and traceback when the block raised (all `None` otherwise). Returning a falsy value lets the exception propagate; returning `True` suppresses it.

### Creating One with `contextlib`

For simple cases, `contextlib.contextmanager` turns a generator into a context manager. Everything before `yield` is setup, and everything after it is teardown. This is a useful example of generators doing real work beyond simple iteration.

```python
import time
from contextlib import contextmanager

@contextmanager
def timer():
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"took {time.perf_counter() - start:.3f}s")

with timer():
    sum(range(1_000_000))
```

The `try/finally` is the important part. Putting teardown in `finally` is what guarantees cleanup even if the `with` body raises.

### How I Would Say It in an Interview

> A context manager defines `__enter__` and `__exit__` so a `with` block can guarantee cleanup — closing a file, releasing a lock, rolling back a transaction — even when the block raises. I can write one as a class, or more concisely as a generator decorated with `contextlib.contextmanager`, where the code after `yield` in a `finally` block is the teardown.

## 9. Can a Context Manager Be Used as a Decorator?

> **Short answer:** Yes — `contextlib`'s `@contextmanager` and `ContextDecorator` make a context manager usable as `@cm()`, so its setup/teardown brackets an entire function call instead of just a `with` block.

This is a natural follow-up because it connects the decorator and context manager ideas. Sometimes you want the same enter/exit behavior to wrap a whole function, not just a block inside it.

### The Generator Form Already Works

A function decorated with `contextlib.contextmanager` is also a `ContextDecorator`, so the *same* `timer()` from the previous question can be used as a decorator with no extra code:

```python
from contextlib import contextmanager
import time

@contextmanager
def timer():
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"took {time.perf_counter() - start:.3f}s")

@timer()                 # note the parentheses: decorate with an instance
def process():
    sum(range(1_000_000))

process()                # took 0.0xx s — enter/exit wraps the whole call
```

Each call enters a fresh context, so the same decorator is safe to reuse across many invocations.

### The Class Form via `ContextDecorator`

Subclass `ContextDecorator` and the same object works both as a `with` block and as a decorator:

```python
from contextlib import ContextDecorator
import time

class timed(ContextDecorator):
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, *exc):
        print(f"took {time.perf_counter() - self.start:.3f}s")
        return False

@timed()
def process():
    sum(range(1_000_000))

with timed():            # still works as a normal context manager too
    sum(range(1_000_000))
```

One caveat matters: the decorator form cannot bind the `__enter__` return value because there is no `as` target. Use it when you care about the setup/teardown side effect, not when the function body needs a resource from the context manager.

### How I Would Say It in an Interview

> Yes. If I build a context manager with `contextlib.contextmanager` or by subclassing `ContextDecorator`, the same object works as both a `with` block and a `@decorator`. I reach for the decorator form when the enter/exit logic should wrap an entire function — like timing or logging — and I don't need the value the context manager would normally bind with `as`.

## 10. Explain `async` and `await`

> **Short answer:** `async def` defines a coroutine and `await` suspends it until the awaited operation is ready, letting the event loop run other coroutines meanwhile — great for I/O-bound concurrency, not a CPU-bound speedup.

Start with this: `async` is about concurrency, especially I/O-bound concurrency.

- `async def` defines a coroutine.
- `await` pauses that coroutine until the awaited operation is ready.
- While it is waiting, the event loop can run other tasks.

```python
import asyncio

async def fetch_data():
    await asyncio.sleep(1)
    return {"status": "ok"}
```

### What Is the Event Loop?

The event loop is the scheduler. It runs asynchronous tasks and callbacks, performs network I/O, and decides when suspended coroutines should resume.

Here is the payoff: three one-second waits finish in about one second, not three, because the loop overlaps the waiting time:

```python
import asyncio, time

async def task(name, delay):
    await asyncio.sleep(delay)
    return name

async def main():
    start = time.perf_counter()
    results = await asyncio.gather(task("a", 1), task("b", 1), task("c", 1))
    print(results, f"{time.perf_counter() - start:.2f}s")
    # ['a', 'b', 'c'] ~1.00s — concurrent, not 3s

asyncio.run(main())
```

### Async vs Multithreading

Async and threads both help with concurrency, but they work differently.

Async:

- usually runs many tasks cooperatively
- is especially good for I/O-bound workloads
- relies on `await` points where control can be handed back

Threads:

- involve OS threads
- are useful for blocking I/O and integration with blocking libraries
- are still constrained by the GIL for CPU-bound Python bytecode

### When Should You Not Use Async?

Async is not automatically the best answer.

Avoid forcing async when:

- the work is CPU-bound
- the libraries are blocking anyway
- the added complexity does not improve throughput or latency

### How I Would Say It in an Interview

> `async` and `await` are for cooperative concurrency. A coroutine can pause while waiting on I/O, and the event loop can run other coroutines in the meantime. It is especially useful for I/O-bound services with lots of waiting, not as a magic speedup for CPU-heavy work.

## 11. What Happens If You Call a Blocking Function Inside an Async Endpoint?

> **Short answer:** A blocking call inside `async def` freezes the whole event loop, so every other in-flight request stalls until it returns; fix it with an async library, a plain `def` endpoint (FastAPI runs those in a threadpool), or a worker queue.

You block the event loop, which is exactly what async code is trying to avoid.

One slow blocking call can delay every other piece of work that the same event loop could otherwise be handling.

```python
from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/bad")
async def bad_endpoint():
    time.sleep(5)  # blocks the event loop
    return {"ok": True}
```

### Why Does This Hurt FastAPI?

FastAPI's guidance is practical here:

- if a library supports `await`, use it inside `async def`
- if a library is blocking and does not support `await`, a normal `def` endpoint can be the better choice
- FastAPI can run regular `def` path functions in a threadpool instead of blocking the main event loop

The same rule shows up in file streaming too: blocking file operations can block the event loop, so a regular `def` path operation can be safer in those cases.

### How Would You Fix It?

The fix depends on what is blocking:

- replace blocking I/O with async-compatible libraries
- use async DB drivers
- use async HTTP clients
- move blocking work to a thread pool when appropriate
- move long-running or CPU-bound work to a worker queue

For example:

```python
from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/good")
async def good_endpoint():
    await asyncio.sleep(5)
    return {"ok": True}
```

And if the blocking library has no async equivalent, a plain `def` endpoint is often the safer choice. FastAPI runs it in a threadpool so it does not stall the event loop:

```python
import time

@app.get("/ok-for-blocking-libs")
def blocking_but_safe():
    time.sleep(5)  # runs in FastAPI's threadpool, event loop stays free
    return {"ok": True}
```

### When Would You Use a Worker Queue?

When the work is:

- long-running
- CPU-heavy
- retryable
- not something the user should wait on during the HTTP request

Typical cases:

- video processing
- report generation
- large inference batches
- email delivery
- third-party API retry pipelines

<div class="mermaid">
flowchart LR
    A["Incoming request"] --> B{"Blocking call inside async endpoint?"}
    B -->|Yes| C["Event loop stalls"]
    C --> D["Higher latency"]
    C --> E["Lower concurrency"]
    B -->|No| F["await non-blocking operation"]
    F --> G["Other requests keep making progress"]

    classDef start fill:#e8f2ff,stroke:#1e90ff,color:#0b3d91;
    classDef decision fill:#fff3e0,stroke:#f59e0b,color:#92400e;
    classDef bad fill:#fdeaea,stroke:#ef4444,color:#991b1b;
    classDef good fill:#e6f7f1,stroke:#10b981,color:#065f46;
    class A start;
    class B decision;
    class C,D,E bad;
    class F,G good;
</div>

### How I Would Say It in an Interview

> If I call blocking code inside an async endpoint, I lose the benefit of the event loop because that endpoint ties it up. In FastAPI I would prefer async-compatible libraries when possible, a normal `def` endpoint for blocking libraries when appropriate, and a worker queue for long-running or CPU-heavy jobs.

## What Interviewers Usually Want to Hear

Most Python core interviews are not really testing whether you memorized a glossary. They are testing whether you can move through three layers cleanly:

1. the definition
2. the practical implication
3. the right tool or tradeoff

For example, this answer is weak:

> A generator uses `yield`.

This answer is much stronger:

> A generator is a lazy iterator built with `yield`. It pauses and resumes execution, so it can produce values one at a time instead of building the whole result in memory. I prefer it when processing large files or streaming records.

That is usually the difference between knowing a Python term and being able to explain the engineering tradeoff behind it.

## References

The explanations above were checked against these references:

- [Python Glossary](https://docs.python.org/3/glossary.html)
- [Python Built-in Types](https://docs.python.org/3/library/stdtypes.html)
- [Python Tutorial: Data Structures](https://docs.python.org/3/tutorial/datastructures.html)
- [Python `functools` docs](https://docs.python.org/3/library/functools.html)
- [Python `contextlib` docs](https://docs.python.org/3/library/contextlib.html)
- [Python `asyncio` docs](https://docs.python.org/3/library/asyncio.html)
- [Python Event Loop docs](https://docs.python.org/3/library/asyncio-eventloop.html)
- [Python `gc` docs](https://docs.python.org/3/library/gc.html)
- [Python Data Model](https://docs.python.org/3/reference/datamodel.html)
- [FastAPI: Concurrency and async / await](https://fastapi.tiangolo.com/async/)
- [FastAPI: Stream Data](https://fastapi.tiangolo.com/advanced/stream-data/)
