---
layout: post
title: "Python Core Interview Questions and Answers: Clear, Practical Explanations"
date: 2026-05-17 12:00:00 +0900
modified_date: 2026-05-18 12:00:00 +0900
comments: true
categories: python
tags: [python, interview-prep, async, generators, concurrency]
description: "A more human-readable Python interview guide covering data structures, identity, memory management, the GIL, iterators, generators, decorators, and async with answers grounded in the official docs."
custom_css: mermaid
custom_js: mermaid
---

Python interview questions sound simple until you try to answer them out loud. Most people know the terms. Fewer people can explain them clearly, tie them back to the official definitions, and still sound natural instead of memorized.

This guide is meant to help with that second part. I rewrote these answers to be closer to how a strong candidate would actually explain them in an interview, while staying aligned with the official Python and FastAPI documentation.

If you want a simple answering pattern, use this:

1. Start with the definition.
2. Explain what it means in normal code.
3. Give one practical example.
4. Mention one tradeoff or common mistake.

## Interview Map

These questions usually fall into three buckets: Python objects, Python runtime behavior, and concurrency.

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
    D --> D1["GIL"]
    D --> D2["async and await"]
    D --> D3["blocking inside async endpoints"]
</div>

## 4. What Is the Difference Between a List, Tuple, Set, and Dictionary in Python?

The official docs describe these four as different built-in container types with different jobs:

- `list` is the standard mutable sequence type.
- `tuple` is an immutable sequence.
- `set` is an unordered collection of distinct hashable objects.
- `dict` is Python's standard mapping type: it maps hashable keys to values.

That sounds abstract, so here is the practical version:

| Type | Best mental model | Ordered | Mutable | Duplicate values | Main strength |
| ---- | ----------------- | ------- | ------- | ---------------- | ------------- |
| `list` | an editable sequence | Yes | Yes | Yes | index-based access |
| `tuple` | a fixed sequence | Yes | No | Yes | safety, hashability in the right cases |
| `set` | a bag of unique items | No | Yes | No | fast membership tests |
| `dict` | a lookup table | Yes, by insertion order | Yes | keys must be unique | key-based lookup |

### Which Are Mutable?

- `list`, `set`, and `dict` are mutable.
- `tuple` is immutable.

That means you can add, remove, or update entries in a list, set, or dictionary after creation, but you cannot modify the tuple itself.

### Which Are Hashable?

The Python glossary says an object is hashable if its hash value does not change during its lifetime and it can be compared to other objects. Hashable objects can be used as dictionary keys or as set members.

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

For example, the Python tutorial explicitly shows `set()` as a convenient way to remove duplicates from a sequence:

```python
names = ["alice", "bob", "alice", "charlie"]
unique_names = set(names)
```

And if you need to ask "have I seen this before?" many times, a set is usually the better tool:

```python
seen = {"alice", "bob", "charlie"}

if "alice" in seen:
    print("duplicate")
```

### How I Would Say It in an Interview

> A list and tuple are both ordered sequences, but a list is mutable and a tuple is not. A set stores unique values and is especially useful for membership checks and deduplication. A dictionary maps keys to values and is the right choice when I want fast lookup by key.

## 5. What Is the Difference Between `is` and `==`?

This is one of the most common Python interview questions because it reveals whether you understand objects or just syntax.

- `==` checks whether two objects have the same value.
- `is` checks whether two references point to the same object.

The Python data model puts it very directly: every object has an identity, a type, and a value, and the `is` operator compares identity.

```python
a = [1, 2, 3]
b = [1, 2, 3]

print(a == b)  # True
print(a is b)  # False
```

These lists are equal in value, but they are not the same object.

### What Does Object Identity Mean?

Object identity means the "which object is this?" question, not the "what value does it hold?" question.

If two variables refer to the exact same underlying object, `is` returns `True`.

```python
a = []
b = a

print(a is b)  # True
```

### Why Can `a is b` Be True for Small Integers or Strings?

Because CPython sometimes reuses immutable objects such as small integers or interned strings.

The Python data model notes that for immutable types, operations may return a reference to an existing object with the same type and value. That is why this can happen:

```python
a = 10
b = 10
print(a is b)  # Often True in CPython
```

But that is an implementation detail, not a rule you should build logic around.

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

## 6. Explain Python's Memory Management

At a high level, Python handles memory automatically. In CPython, the two concepts interviewers usually want are reference counting and garbage collection.

### What Is Reference Counting?

The Python glossary defines a reference count as the number of references to an object. When that count drops to zero, the object is deallocated.

```python
x = [1, 2, 3]
y = x
del x
del y
```

Once nothing refers to that list anymore, CPython can reclaim it.

### What Is Garbage Collection?

The `gc` docs explain that the garbage collector supplements reference counting. In practice, that matters because reference counting alone cannot clean up every case.

### What Are Circular References?

A circular reference happens when objects keep references to each other, so their reference counts never reach zero even though the program no longer needs them.

```python
a = {}
b = {}

a["other"] = b
b["other"] = a
```

Now `a` points to `b`, and `b` points back to `a`.

If the rest of the program stops referring to both objects, they are still part of a cycle. That is why Python also has cyclic garbage collection.

<div class="mermaid">
flowchart LR
    A["Object A"] --> B["Object B"]
    B --> A
    C["No outside references remain"] --> D["Reference counts do not reach zero"]
    D --> E["Garbage collector detects unreachable cycle"]
</div>

### Why This Matters in Real Projects

Most of the time you do not think about manual allocation in Python, but you still need to think about object lifetime.

Common real-world mistakes include:

- large cached objects staying alive too long
- long-running services holding references by accident
- circular references in complex object graphs
- forgetting to close files, sockets, or database connections

### How I Would Say It in an Interview

> In CPython, memory management is based first on reference counting. When an object's reference count drops to zero, it can be deallocated. On top of that, Python has a garbage collector for cyclic references, because reference counting alone cannot clean up objects that keep each other alive.

## 7. What Is the GIL?

The GIL is the Global Interpreter Lock in CPython.

The practical meaning is simple: only one thread at a time can execute Python bytecode inside a single interpreter process.

The CPython C API documentation explains the motivation clearly: the interpreter is not fully thread-safe, so the GIL protects access to Python objects and interpreter state.

### Why Does Python Have the GIL?

Historically, it made CPython's memory management and object model simpler and safer, especially around shared state and reference counting.

That does not mean it is "good" in every workload. It means it was a design tradeoff.

### How Does It Affect Multithreading?

If your code is CPU-bound and written mostly in pure Python, threads often do not speed it up the way people expect. They still compete for the GIL.

So if you start four Python threads to do four heavy CPU tasks, that does not automatically mean four cores are doing Python work in parallel.

### When Is Multithreading Still Useful?

Very often, for I/O-bound work.

The CPython docs note that the GIL is released around potentially blocking I/O operations such as file reads and writes. That is why threads are still useful for:

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
</div>

### Important Nuance

Do not say "Python cannot do multithreading." That is too blunt and not correct.

A better answer is:

> CPython supports threads, but the GIL limits parallel execution of Python bytecode in a single process. Threads still help a lot for I/O-bound workloads.

## 8. What Is an Iterator in Python?

The Python glossary defines an iterator as an object representing a stream of data.

Repeated calls to `__next__()` return successive items, and when no more data is available, the iterator raises `StopIteration`.

An iterator also implements `__iter__()`, returning itself.

```python
nums = iter([1, 2, 3])

print(next(nums))  # 1
print(next(nums))  # 2
print(next(nums))  # 3
```

### Iterable vs Iterator

This distinction matters.

- An iterable is something you can loop over.
- An iterator is the object that actually produces the next value.

```python
items = [1, 2, 3]  # iterable
it = iter(items)   # iterator
```

The Python glossary points out an important difference: a container such as a list can produce a fresh iterator each time, while an iterator itself is usually single-pass and gets exhausted.

### How I Would Say It in an Interview

> An iterator is the object that yields values one by one through `__next__()`. An iterable is any object that can give me an iterator. A list is iterable, but the object returned by `iter(list_obj)` is the iterator.

## 9. What Is a Generator?

A generator is one of Python's nicest ideas because it lets you build an iterator without manually writing an iterator class.

In Python terms, a generator function uses `yield`, and calling it returns a generator iterator.

```python
def count_up_to(n):
    current = 1
    while current <= n:
        yield current
        current += 1
```

### How Does `yield` Work?

`yield` pauses the function and sends a value back to the caller. When iteration continues, the function resumes from where it left off, with its state preserved.

That is why generators feel lazy: they compute values only when needed.

### Why Are Generators Memory-Efficient?

Because they do not materialize the whole result upfront.

If you are processing a large file, a large query result, or a stream of events, yielding one item at a time is often much cheaper than building a list of everything first.

```python
def read_ids(path):
    with open(path) as f:
        for line in f:
            yield int(line.strip())
```

### When Is a Generator Better Than a List?

When you only need one-pass processing.

If you need to scan a huge dataset once, a generator is often the right tool. If you need repeated indexing, slicing, or multiple passes, a list may be the better choice.

### How I Would Say It in an Interview

> A generator is a lazy iterator, usually created by a function that uses `yield`. It gives values one at a time, preserves its state between yields, and is often much more memory-efficient than building a full list upfront.

## 10. What Is a Decorator?

The official glossary describes a decorator as a callable that returns another function, class, or method, and function definitions can be "wrapped" this way with the `@decorator` syntax.

In normal language, a decorator is just a way to add behavior around a function without rewriting that function's core logic.

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
```

### What Does `functools.wraps` Do?

According to the `functools` docs, `wraps()` is a convenience helper around `update_wrapper()`.

The practical effect is that it preserves metadata from the original function, such as:

- `__name__`
- `__doc__`
- other wrapper metadata used by tooling and frameworks

Without it, your wrapped function often looks like it is just called `wrapper`, which can be annoying in debugging and sometimes breaks introspection.

### How I Would Say It in an Interview

> A decorator wraps a function so I can add behavior around it without changing the original logic. I use them for cross-cutting concerns like logging or auth. I also use `functools.wraps` so the wrapped function keeps its original metadata.

## 11. Explain `async` and `await`

The official `asyncio` docs describe `asyncio` as a library for writing concurrent code using the `async` and `await` syntax, and they note that it is often a very good fit for I/O-bound code.

That is the right starting point.

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

The Python docs call the event loop the core of every `asyncio` application. It runs asynchronous tasks and callbacks, performs network I/O, and manages when coroutines resume.

That is why the event loop is such a central idea in async Python: it is the scheduler.

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

## 12. What Happens If You Call a Blocking Function Inside an Async Endpoint?

You block the event loop, which is exactly what async code is trying to avoid.

That means one slow blocking call can delay other work that the same event loop could otherwise be handling.

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

The FastAPI docs are very explicit here:

- if a library supports `await`, use it inside `async def`
- if a library is blocking and does not support `await`, a normal `def` endpoint can be the better choice
- FastAPI can run regular `def` path functions in a threadpool instead of blocking the main event loop

FastAPI's docs on file streaming make the same point in another form: blocking file operations can block the event loop, so using a regular `def` path operation can be safer in those cases.

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
</div>

### How I Would Say It in an Interview

> If I call blocking code inside an async endpoint, I lose the benefit of the event loop because that endpoint ties it up. In FastAPI I would prefer async-compatible libraries when possible, a normal `def` endpoint for blocking libraries when appropriate, and a worker queue for long-running or CPU-heavy jobs.

## What Interviewers Usually Want to Hear

Most Python core interviews are not testing whether you memorized a glossary. They are testing whether you can move through three layers cleanly:

1. the definition
2. the practical implication
3. the right tool or tradeoff

For example, this answer is weak:

> A generator uses `yield`.

This answer is much stronger:

> A generator is a lazy iterator built with `yield`. It pauses and resumes execution, so it can produce values one at a time instead of building the whole result in memory. I prefer it when processing large files or streaming records.

That is what usually separates "knows Python" from "can explain Python well."

## References

The explanations above were aligned against the official docs here:

- [Python Glossary](https://docs.python.org/3/glossary.html)
- [Python Built-in Types](https://docs.python.org/3/library/stdtypes.html)
- [Python Tutorial: Data Structures](https://docs.python.org/3/tutorial/datastructures.html)
- [Python `functools` docs](https://docs.python.org/3/library/functools.html)
- [Python `asyncio` docs](https://docs.python.org/3/library/asyncio.html)
- [Python Event Loop docs](https://docs.python.org/3/library/asyncio-eventloop.html)
- [Python `gc` docs](https://docs.python.org/3/library/gc.html)
- [Python Data Model](https://docs.python.org/3/reference/datamodel.html)
- [FastAPI: Concurrency and async / await](https://fastapi.tiangolo.com/async/)
- [FastAPI: Stream Data](https://fastapi.tiangolo.com/advanced/stream-data/)
